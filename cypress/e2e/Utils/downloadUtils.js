// cypress/support/utils/downloadUtils.js
import 'cypress-xpath';

const dlDirDefault = () => Cypress.config('downloadsFolder') || 'cypress/downloads';
const isWin = () => Cypress.platform === 'win32';

/** Delete matching files via OS shell (no config tasks needed) */
export function clearDownloads({ pattern = '*.pdf', dir = dlDirDefault() } = {}) {
  const cmd = isWin()
    ? `cmd /c del /q "${dir}\\${pattern}" 2>nul || exit /b 0`
    : `bash -lc 'rm -f "${dir}/${pattern}"'`;

  return cy.exec(cmd, { failOnNonZeroExit: false, timeout: 20000 })
           .then(() => cy.log(`🧹 Cleared ${pattern} in ${dir}`));
}

/** List matching files (returns array of filenames only) */
export function listDownloads({ pattern = '*.pdf', dir = dlDirDefault() } = {}) {
  const cmd = isWin()
    ? `cmd /c dir /b "${dir}\\${pattern}" 2>nul || exit /b 0`
    : `bash -lc 'ls -1 "${dir}/${pattern}" 2>/dev/null || true'`;

  return cy.exec(cmd, { failOnNonZeroExit: false }).then(({ stdout }) => {
    const lines = stdout.trim() ? stdout.trim().split(/\r?\n/) : [];
    return isWin() ? lines : lines.map(p => p.split('/').pop());
  });
}

/** Poll until at least one file exists, then return the first filename */
export function waitForDownload({
  pattern = '*.pdf',
  dir = dlDirDefault(),
  timeout = 30000,
  interval = 500,
} = {}) {
  const start = Date.now();

  function poll() {
    return listDownloads({ pattern, dir }).then(files => {
      if (files.length > 0) return files[0];
      if (Date.now() - start > timeout) {
        throw new Error(`Download not found after ${timeout}ms for ${pattern}`);
      }
      return cy.wait(interval).then(poll);
    });
  }

  return poll();
}

/** Assert the file is non-empty */
export function verifyDownloadedFileNonEmpty(filename, { dir = dlDirDefault() } = {}) {
  const full = isWin() ? `${dir}\\${filename}` : `${dir}/${filename}`;
  return cy.readFile(full, 'binary', { timeout: 30000 }).then(buf => {
    expect(buf.length, `${filename} size`).to.be.greaterThan(0);
    return { filename, path: full, size: buf.length };
  });
}

/** Full flow: clear -> trigger -> wait -> verify */
export function downloadAndVerify(triggerFn, {
  pattern = '*.pdf',
  dir = dlDirDefault(),
  timeout = 30000,
  interval = 500,
} = {}) {
  return clearDownloads({ pattern, dir })
    .then(() => cy.then(() => { triggerFn(); }))   // enqueue user click
    .then(() => waitForDownload({ pattern, dir, timeout, interval }))
    .then(filename => verifyDownloadedFileNonEmpty(filename, { dir }));
}
