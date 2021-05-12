import { getInput, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import fs from 'fs';
import os from 'os';

export const getInputList = (name: string): string[] => getInput(name)
  .split(',')
  .map((x) => x.trim());

export const DEPENDENCIES = {
  'ubuntu18.04': {
    chromium: [
      'fonts-liberation',
      'libasound2',
      'libatk-bridge2.0-0',
      'libatk1.0-0',
      'libatspi2.0-0',
      'libcairo2',
      'libcups2',
      'libdbus-1-3',
      'libdrm2',
      'libgbm1',
      'libgdk-pixbuf2.0-0',
      'libglib2.0-0',
      'libgtk-3-0',
      'libnspr4',
      'libnss3',
      'libpango-1.0-0',
      'libpangocairo-1.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb-dri3-0',
      'libxcb1',
      'libxcomposite1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxrandr2',
      'libxtst6',
    ],
    firefox: [
      'libatk1.0-0',
      'libcairo-gobject2',
      'libcairo2',
      'libdbus-1-3',
      'libdbus-glib-1-2',
      'libfontconfig1',
      'libfreetype6',
      'libgdk-pixbuf2.0-0',
      'libglib2.0-0',
      'libgtk-3-0',
      'libgtk2.0-0',
      'libpango-1.0-0',
      'libpangocairo-1.0-0',
      'libpangoft2-1.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb-shm0',
      'libxcb1',
      'libxcomposite1',
      'libxcursor1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxrender1',
      'libxt6',
    ],
    webkit: [
      'gstreamer1.0-libav',
      'gstreamer1.0-plugins-bad',
      'gstreamer1.0-plugins-base',
      'gstreamer1.0-plugins-good',
      'libatk-bridge2.0-0',
      'libatk1.0-0',
      'libbrotli1',
      'libcairo2',
      'libegl1',
      'libenchant1c2a',
      'libepoxy0',
      'libfontconfig1',
      'libfreetype6',
      'libgdk-pixbuf2.0-0',
      'libgl1',
      'libgles2',
      'libglib2.0-0',
      'libgstreamer-gl1.0-0',
      'libgstreamer1.0-0',
      'libgtk-3-0',
      'libharfbuzz-icu0',
      'libharfbuzz0b',
      'libhyphen0',
      'libicu60',
      'libjpeg-turbo8',
      'libnotify4',
      'libopenjp2-7',
      'libopus0',
      'libpango-1.0-0',
      'libpng16-16',
      'libsecret-1-0',
      'libvpx5',
      'libwayland-client0',
      'libwayland-egl1',
      'libwayland-server0',
      'libwebp6',
      'libwebpdemux2',
      'libwoff1',
      'libx11-6',
      'libxcomposite1',
      'libxdamage1',
      'libxkbcommon0',
      'libxml2',
      'libxslt1.1',
    ],
  },

  'ubuntu20.04': {
    chromium: [
      'fonts-liberation',
      'libasound2',
      'libatk-bridge2.0-0',
      'libatk1.0-0',
      'libatspi2.0-0',
      'libcairo2',
      'libcups2',
      'libdbus-1-3',
      'libdrm2',
      'libgbm1',
      'libgdk-pixbuf2.0-0',
      'libglib2.0-0',
      'libgtk-3-0',
      'libnspr4',
      'libnss3',
      'libpango-1.0-0',
      'libpangocairo-1.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb-dri3-0',
      'libxcb1',
      'libxcomposite1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxrandr2',
      'libxtst6',
    ],
    firefox: [
      'libatk1.0-0',
      'libcairo-gobject2',
      'libcairo2',
      'libdbus-1-3',
      'libdbus-glib-1-2',
      'libfontconfig1',
      'libfreetype6',
      'libgdk-pixbuf2.0-0',
      'libglib2.0-0',
      'libgtk-3-0',
      'libgtk2.0-0',
      'libpango-1.0-0',
      'libpangocairo-1.0-0',
      'libpangoft2-1.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb-shm0',
      'libxcb1',
      'libxcomposite1',
      'libxcursor1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxrender1',
      'libxt6',
    ],
    webkit: [
      'gstreamer1.0-libav',
      'gstreamer1.0-plugins-bad',
      'gstreamer1.0-plugins-base',
      'gstreamer1.0-plugins-good',
      'libatk-bridge2.0-0',
      'libatk1.0-0',
      'libcairo2',
      'libegl1',
      'libenchant1c2a',
      'libepoxy0',
      'libfontconfig1',
      'libfreetype6',
      'libgdk-pixbuf2.0-0',
      'libgl1',
      'libgles2',
      'libglib2.0-0',
      'libgstreamer-gl1.0-0',
      'libgstreamer1.0-0',
      'libgtk-3-0',
      'libharfbuzz-icu0',
      'libharfbuzz0b',
      'libhyphen0',
      'libicu66',
      'libjpeg-turbo8',
      'libnotify4',
      'libopenjp2-7',
      'libopus0',
      'libpango-1.0-0',
      'libpng16-16',
      'libsecret-1-0',
      'libsoup2.4-1',
      'libvpx6',
      'libwayland-client0',
      'libwayland-egl1',
      'libwayland-server0',
      'libwebp6',
      'libwebpdemux2',
      'libwoff1',
      'libx11-6',
      'libxcomposite1',
      'libxdamage1',
      'libxkbcommon0',
      'libxml2',
      'libxslt1.1',
    ],
  },
} as const;

export async function getUbuntuVersion(): Promise<string> {
  if (os.platform() !== 'linux') return '';

  const osReleaseText = await fs.promises.readFile('/etc/os-release', 'utf8');

  if (!osReleaseText) return '';

  const fields = new Map<string, string>();

  for (const line of osReleaseText.split('\n')) {
    const tokens = line.split('=');
    const name = tokens.shift();
    let value = tokens.join('=').trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }

    // eslint-disable-next-line no-continue
    if (!name) continue;

    fields.set(name.toLowerCase(), value);
  }

  if (!fields.get('name') || fields.get('name')!.toLowerCase() !== 'ubuntu') {
    return '';
  }

  return fields.get('version_id') || '';
}

function getDependencies(
  osVersion: 'ubuntu18.04' | 'ubuntu20.04',
  browsers: string[],
): string[] {
  const deps: string[] = [];

  browsers.forEach((browser) => {
    switch (browser) {
      case 'chromium':
      case 'firefox':
      case 'webkit':
        deps.concat(DEPENDENCIES[osVersion][browser]);
        break;
      default:
        throw new Error(`Unrecognised browser ${browser}`);
    }
  });

  return deps;
}

export async function run(): Promise<void> {
  try {
    if (os.platform() === 'linux') {
      await exec('sudo', ['apt-get', 'update']);

      const ubuntuVersion = await getUbuntuVersion();
      const browsers = getInputList('browsers');
      let deps = [];

      if (ubuntuVersion === '18.04') {
        deps = getDependencies('ubuntu18.04', browsers);
      } else if (ubuntuVersion === '20.04') {
        deps = getDependencies('ubuntu20.04', browsers);
      } else {
        throw new Error(
          'Cannot install dependencies for this linux distribution!',
        );
      }

      await exec('sudo', [
        'apt-get',
        'install',
        '-y',
        '--no-install-recommends',
        ...deps,
      ]);

      if (browsers.includes('firefox')) {
        // - `ffmpeg`: For video playback in Firefox
        await exec('sudo', ['apt-get', 'install', '-y', 'ffmpeg']);
      }

      if (getInput('headless') !== 'true') {
        await exec('sudo', ['apt-get', 'install', '-y', 'xvfb']);
      }
    }
  } catch (error) {
    setFailed((error as Error).message || error);
  }
}
