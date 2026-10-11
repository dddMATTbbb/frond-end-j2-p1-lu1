import { expect, test } from '@playwright/test';

const books = [
    {
        id: 'hobbit',
        Titel: 'De Hobbit',
        Auteur: 'J.R.R. Tolkien',
        isBookmarked: false,
        isRead: false,
    },
    {
        id: 'kruistocht',
        Titel: 'Kruistocht in Spijkerbroek',
        Auteur: 'Thea Beckman',
        isBookmarked: false,
        isRead: false,
    },
];

test('student logt in, zoekt een boek en bewaart het op de leeslijst', async ({ page }) => {
    let readList: typeof books = [];

    await page.route('http://localhost:3000/**', async (route) => {
        const request = route.request();
        const url = new URL(request.url());

        if (url.pathname === '/login') {
            await route.fulfill({ json: { message: 'Authentication successful' } });
        } else if (url.pathname === '/check-auth') {
            await route.fulfill({ status: 200, json: { authenticated: true } });
        } else if (url.pathname === '/checkRole') {
            await route.fulfill({ json: { message: 'student' } });
        } else if (url.pathname === '/leesProfiel') {
            await route.fulfill({ json: { message: 'Leesprofiel bestaat' } });
        } else if (url.pathname === '/boeken' && request.method() === 'GET') {
            const zoekTerm = url.searchParams.get('zoekTerm')?.toLowerCase();
            const result = zoekTerm
                ? books.filter((book) =>
                    `${book.Titel} ${book.Auteur}`.toLowerCase().includes(zoekTerm),
                )
                : books;
            await route.fulfill({ json: result });
        } else if (url.pathname === '/leesLijst' && request.method() === 'POST') {
            const { boekId, isBookmarked } = request.postDataJSON() as {
                boekId: string;
                isBookmarked: boolean;
            };
            const book = books.find((item) => item.id === boekId);
            if (book) {
                book.isBookmarked = isBookmarked;
                readList = isBookmarked
                    ? [book]
                    : readList.filter((item) => item.id !== boekId);
            }
            await route.fulfill({ json: { message: 'Leeslijst bijgewerkt' } });
        } else if (url.pathname === '/leesLijst' && request.method() === 'GET') {
            await route.fulfill({ json: readList });
        } else {
            await route.fulfill({ status: 404, json: { message: 'Not mocked' } });
        }
    });

    await page.goto('/');
    await page.getByPlaceholder('E-mail').fill('student@example.com');
    await page.getByPlaceholder('Wachtwoord').fill('test-wachtwoord');
    await page.getByLabel('Student').check();
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page).toHaveURL(/\/VoorJou$/);
    await page.getByRole('link', { name: 'Ontdekken' }).click();
    await expect(page.getByRole('heading', { name: 'De Hobbit' })).toBeVisible();

    await page.getByPlaceholder('Filter op naam of auteur...').fill('Hobbit');
    await page.getByRole('button', { name: 'Zoeken' }).click();
    await expect(page.getByRole('heading', { name: 'De Hobbit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kruistocht in Spijkerbroek' })).toHaveCount(0);

    await page.getByAltText('Bookmark knop').click();
    await expect(page).toHaveURL(/\/Ontdekken$/);
    await page.getByRole('link', { name: 'Leeslijst' }).click();
    await expect(page.getByRole('heading', { name: 'De Hobbit' })).toBeVisible();
});

test('niet-ingelogde bezoeker wordt doorgestuurd vanaf een afgeschermde pagina', async ({ page }) => {
    await page.route('http://localhost:3000/check-auth', async (route) => {
        await route.fulfill({ status: 401, json: { authenticated: false } });
    });

    await page.goto('/Ontdekken');

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Welkom bij kiesboek' })).toBeVisible();
});
