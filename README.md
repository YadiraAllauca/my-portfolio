# Yadira Allauca · Portfolio

A concise, English-language portfolio for a software engineer and full stack developer in Ecuador. Built with TypeScript, Vite and CSS, without a runtime UI framework or backend.

## Run

Use **Node.js 24.x** and npm. The runtime is pinned in `package.json` and `.nvmrc`. With nvm installed, run `nvm install` and `nvm use` in this directory before installing dependencies.

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

The build checks application TypeScript and generates static files in `dist/`. Development and preview bind to localhost by default.

## Content

- **Selected work:** Atril, México Lindo and the Angelcam technical assessment.
- **Background:** experience at Angelcam, Laboratorio Farmacéutico Neo and EEASA, plus education and the Innovasoft award.
- **Contact:** email and links to GitHub and LinkedIn. No contact form, tracking or backend is configured.

The professional background comes from the supplied LinkedIn export. Project scope comes from the reviewed repositories and portfolio handoff. The Angelcam assessment is presented separately from employment at Angelcam. No client metrics, testimonials, live deployments or language proficiency have been invented.

## Edit

- `index.html`: page copy, navigation, experience, skills and contact.
- `src/main.ts`: project case details, mobile menu and email-copy behaviour.
- `src/style.css`: layout, typography, colours, motion and responsive rules.
- `public/images/`: actual project interface captures. Atril images use original demonstration notation; México Lindo is captured from its local build.
- `public/brand/`: supplied wordmark variants and the matching favicon. The transparent PNG is displayed directly on the light header and footer. A CSS-only dark treatment preserves the supplied lettering while improving contrast; the original PNG pixels are unchanged. The original white-background version is preserved as a separate asset; both source images retain their original pixels.

DM Sans and Instrument Serif are loaded from Google Fonts, with local fallback fonts. Application content does not depend on the font service. The original LinkedIn PDF is not included in the public files.

## Deploy to Vercel from `main`

The repository is prepared for Vercel's native Git integration. After the repository is published, pushes and merged pull requests to `main` can deploy production automatically. No GitHub Actions workflow or deployment token is required for this integration.

### One-time setup after publishing the repository

1. Publish this repository with **`main`** as its default branch. Commit the source, `package-lock.json`, `vercel.json` and `.nvmrc`; generated output and local dependencies are ignored.
2. In Vercel, choose **Add New → Project** and import the repository. Grant the Git integration access to that repository if prompted.
3. Use the settings below, then create the first deployment.
4. In the project's **Settings → Environments → Production → Branch Tracking**, confirm that **Production Branch** is **`main`**. Some dashboard layouts show this under the project's Git settings.

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | Repository root (`./`) |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | `24.x` |
| Production branch | `main` |
| Environment variables | None required |

`vercel.json` supplies the framework and build settings. Node.js is declared in `package.json`. The repository connection and production branch are Vercel project settings: they cannot be activated solely by committing a configuration file.

### Subsequent deployments

Push or merge changes into `main`. Vercel installs the locked dependencies, checks TypeScript, builds the static site and publishes a new production deployment. Check its status in the project's **Deployments** tab. Other branches can use Vercel's default preview deployments.

Before pushing, verify locally:

```sh
npm ci
npm run build
```

No repository publication, Git connection, commit, push or Vercel deployment is performed by this setup. Once the first production deployment succeeds, confirm that the page, brand assets, project dialogs and contact links work at the stable production URL.

References: [Vercel Git integration](https://vercel.com/docs/git), [production environments](https://vercel.com/docs/deployments/environments), and [project configuration](https://vercel.com/docs/project-configuration/vercel-json).

Other static hosts can also serve `dist/` at the domain root.
