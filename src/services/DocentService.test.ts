import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { addDocentToStudent } from './ProfilePageService.ts' // pas aan naar jouw bestandsnaam

const fakeResponse = (ok: boolean, body: unknown) =>
    ({ ok, json: async () => body }) as Response

describe('addDocentToStudent', () => {
    const originalFetch = globalThis.fetch
    const fetchMock = vi.fn()
    let logSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        globalThis.fetch = fetchMock as unknown as typeof fetch
        logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
        fetchMock.mockReset()
        logSpy.mockRestore()
        globalThis.fetch = originalFetch
    })

    it('doet een POST naar /addDocent met de cookies', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, {}))

        await addDocentToStudent('docent@school.nl')

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/^http:\/\/localhost:3000\/addDocent\?/)
        expect(options).toEqual({ method: 'POST', credentials: 'include' })
    })

    it('zet het e-mailadres als docentMail in de query-string', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, {}))

        await addDocentToStudent('docent@school.nl')

        const url = new URL(fetchMock.mock.calls[0][0])
        expect(url.searchParams.get('docentMail')).toBe('docent@school.nl')
    })

    it('codeert speciale tekens in het e-mailadres', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, {}))

        await addDocentToStudent('docent+klas1@school.nl') // randgeval: + en @

        const aangeroepenUrl: string = fetchMock.mock.calls[0][0]
        expect(aangeroepenUrl).toContain('docentMail=docent%2Bklas1%40school.nl')
        expect(new URL(aangeroepenUrl).searchParams.get('docentMail')).toBe(
            'docent+klas1@school.nl',
        )
    })

    it('geeft het antwoord van de server terug als de koppeling lukt (201)', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, { message: 'Docent gekoppeld' }))

        const result = await addDocentToStudent('docent@school.nl')

        expect(result).toEqual({ message: 'Docent gekoppeld' })
        expect(logSpy).not.toHaveBeenCalled()
    })

    it('geeft de melding van de server terug als de koppeling al bestaat (400)', async () => {
        fetchMock.mockResolvedValue(fakeResponse(false, { message: 'Koppeling bestaat al' }))

        const result = await addDocentToStudent('docent@school.nl')

        expect(result).toEqual({ message: 'Koppeling bestaat al' })
    })

    it('geeft de melding van de server terug als de docent niet bestaat (400)', async () => {
        fetchMock.mockResolvedValue(
            fakeResponse(false, { message: 'Docent email was not found in the db' }),
        )

        const result = await addDocentToStudent('onbekend@school.nl')

        expect(result).toEqual({ message: 'Docent email was not found in the db' })
    })

    it('geeft de melding van de server terug bij een serverfout (500)', async () => {
        fetchMock.mockResolvedValue(fakeResponse(false, { message: 'serverfout' }))

        const result = await addDocentToStudent('docent@school.nl')

        expect(result).toEqual({ message: 'serverfout' })
    })

    it('geeft het foutobject terug en logt het als het netwerk wegvalt', async () => {
        const netwerkFout = new Error('Network down')
        fetchMock.mockRejectedValue(netwerkFout)

        const result = await addDocentToStudent('docent@school.nl')

        expect(result).toBe(netwerkFout) // wordt teruggegeven, niet gegooid
        expect(logSpy).toHaveBeenCalledWith(netwerkFout)
    })

    it('geeft de fout terug als het antwoord geen geldige JSON is', async () => {
        const jsonFout = new SyntaxError('Unexpected token')
        fetchMock.mockResolvedValue({
            ok: true,
            json: async () => {
                throw jsonFout
            },
        } as unknown as Response)

        const result = await addDocentToStudent('docent@school.nl')

        expect(result).toBe(jsonFout)
    })
})