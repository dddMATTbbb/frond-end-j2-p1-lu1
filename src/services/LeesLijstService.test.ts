import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { addToLeesLijst } from './LeesLijstService'

const fakeResponse = (ok: boolean, body: unknown, statusText = 'OK') =>
    ({ ok, statusText, json: async () => body }) as Response

describe('addToLeesLijst', () => {
    const originalFetch = globalThis.fetch
    const fetchMock = vi.fn()
    let logSpy: ReturnType<typeof vi.spyOn>
    let errorSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        globalThis.fetch = fetchMock as unknown as typeof fetch
        logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
        errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        fetchMock.mockReset()
        logSpy.mockRestore()
        errorSpy.mockRestore()
        globalThis.fetch = originalFetch
    })

    it('doet een POST naar /leesLijst met JSON-headers en cookies', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, {}))

        await addToLeesLijst('abc123', false)

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/leesLijst$/)
        expect(options).toMatchObject({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
    })

    it.each([
        { huidig: false, verstuurd: true },  // nog niet in de lijst -> toevoegen
        { huidig: true, verstuurd: false },  // al in de lijst -> verwijderen
    ])(
        'draait de bladwijzerstatus om ($huidig wordt $verstuurd)',
        async ({ huidig, verstuurd }) => {
            fetchMock.mockResolvedValue(fakeResponse(true, {}))

            await addToLeesLijst('abc123', huidig)

            const body = JSON.parse(fetchMock.mock.calls[0][1].body)
            expect(body).toEqual({ boekId: 'abc123', isBookmarked: verstuurd })
        },
    )

    it('geeft het antwoord van de server terug na toevoegen', async () => {
        const serverAntwoord = {
            message: 'Boek succesvol toegevoegd aan de leeslijst',
            isBookmarked: true,
            isRead: false,
        }
        fetchMock.mockResolvedValue(fakeResponse(true, serverAntwoord, 'Created'))

        const result = await addToLeesLijst('abc123', false)

        expect(result).toEqual(serverAntwoord)
        expect(errorSpy).not.toHaveBeenCalled()
    })

    it('geeft het antwoord van de server terug na verwijderen', async () => {
        const serverAntwoord = {
            message: 'Boek succesvol verwijderd uit de leeslijst',
            boekId: 'abc123',
            isBookmarked: false,
        }
        fetchMock.mockResolvedValue(fakeResponse(true, serverAntwoord))

        const result = await addToLeesLijst('abc123', true)

        expect(result).toEqual(serverAntwoord)
    })

    it('gooit een fout met de statusText als de server een fout geeft (500)', async () => {
        fetchMock.mockResolvedValue(
            fakeResponse(false, { message: 'Serverfout' }, 'Internal Server Error'),
        )

        await expect(addToLeesLijst('abc123', false)).rejects.toThrow(
            'Fout bij toevoegen/verwijderen aan leeslijst: Internal Server Error',
        )
        expect(errorSpy).toHaveBeenCalledTimes(1)
    })

    it('gooit een fout bij een lege boekId (server geeft 400)', async () => {
        // randgeval: de backend wijst een lege boekId af met 400
        fetchMock.mockResolvedValue(
            fakeResponse(false, { message: 'Geen boekId meegegeven' }, 'Bad Request'),
        )

        await expect(addToLeesLijst('', false)).rejects.toThrow('Bad Request')
    })

    it('geeft een netwerkfout door aan de aanroeper', async () => {
        fetchMock.mockRejectedValue(new Error('Network down'))

        await expect(addToLeesLijst('abc123', false)).rejects.toThrow('Network down')
        expect(errorSpy).toHaveBeenCalledTimes(1)
    })

    it('gooit een fout als het antwoord geen geldige JSON is', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            statusText: 'OK',
            json: async () => {
                throw new SyntaxError('Unexpected token')
            },
        } as unknown as Response)

        await expect(addToLeesLijst('abc123', false)).rejects.toThrow('Unexpected token')
    })
})