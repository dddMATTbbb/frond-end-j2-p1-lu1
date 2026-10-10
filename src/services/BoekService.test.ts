import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getForYouBoeken } from '../services/BoekenService.ts'

const fakeResponse = (ok: boolean, body: unknown) =>
    ({ ok, json: async () => body }) as Response

const voorbeeldBoeken = [
    {
        id: '1',
        _id: '1',
        Titel: 'De Hobbit',
        titel: 'De Hobbit',
        Auteur: 'J.R.R. Tolkien',
        auteur: 'J.R.R. Tolkien',
        Niveau: 'B1',
        'Type materiaal': 'Roman',
        isBookmarked: true,
        isRead: false,
    },
    {
        id: '2',
        _id: '2',
        Titel: 'Floris',
        titel: 'Floris',
        Auteur: 'Jan Terlouw',
        auteur: 'Jan Terlouw',
        Niveau: 'B2',
        'Type materiaal': 'Roman',
        isBookmarked: false,
        isRead: false,
    },
]

describe('getForYouBoeken', () => {
    const originalFetch = globalThis.fetch
    const fetchMock = vi.fn()
    let logSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        globalThis.fetch = fetchMock as unknown as typeof fetch
        logSpy = vi.spyOn(console, 'log').mockImplementation(() => {}) // houd de testuitvoer schoon
    })

    afterEach(() => {
        fetchMock.mockReset()
        logSpy.mockRestore()
        globalThis.fetch = originalFetch
    })

    it('doet een GET naar /getVoorJou en stuurt de cookies mee', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, []))

        await getForYouBoeken()

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/getVoorJou', {
            method: 'GET',
            credentials: 'include',
        })
    })

    it('geeft de boeken van de server terug bij een geslaagd verzoek', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, voorbeeldBoeken))

        const result = await getForYouBoeken()

        expect(result).toEqual(voorbeeldBoeken)
        expect(logSpy).not.toHaveBeenCalled() // geen fout gelogd
    })

    it('geeft een lege lijst terug als de server geen boeken heeft', async () => {
        fetchMock.mockResolvedValue(fakeResponse(true, [])) // randgeval

        const result = await getForYouBoeken()

        expect(result).toEqual([])
    })

    it('geeft undefined terug en logt de foutmelding als er geen leesprofiel is (404)', async () => {
        fetchMock.mockResolvedValue(
            fakeResponse(false, { message: 'LeesProfiel niet gevonden' }),
        )

        const result = await getForYouBoeken()

        expect(result).toBeUndefined()
        expect(logSpy).toHaveBeenCalledTimes(1)
        const gelogd = logSpy.mock.calls[0][0] as Error
        expect(gelogd).toBeInstanceOf(Error)
        expect(gelogd.message).toContain('LeesProfiel niet gevonden')
    })

    it('geeft undefined terug bij een serverfout (500)', async () => {
        fetchMock.mockResolvedValue(fakeResponse(false, { error: 'Server error' }))

        const result = await getForYouBoeken()

        expect(result).toBeUndefined()
        expect(logSpy).toHaveBeenCalledTimes(1)
    })

    it('geeft undefined terug en gooit niets als het netwerk wegvalt', async () => {
        fetchMock.mockRejectedValue(new Error('Network down'))

        await expect(getForYouBoeken()).resolves.toBeUndefined()
        expect(logSpy).toHaveBeenCalledTimes(1)
    })
})