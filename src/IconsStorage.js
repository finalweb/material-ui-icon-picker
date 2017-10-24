// MODIFIED
import defer from 'promise-defer';
import iconDefs from './faIcons.json';
let instance = null;

export default class IconsStorage {

	icons;
	requestWaitingForIcons;

	constructor() {
		if (instance) {
			return instance;
		}

		this.requestWaitingForIcons = [];
		instance = this;
	}

	getIcons() {
		if (this.icons) {
			return Promise.resolve(this.icons);
		}

		if (this.isLoadingIcons) {
			const p = new defer();

			this.requestWaitingForIcons.push(p);
			return p.promise;
		}

		this.isLoadingIcons = true;
		let data = iconDefs.array;
    const icons = data.map(nameAndCode => {
      const parts = nameAndCode.split(':');
      return {
        code: parts[0],
        name: parts[1]
      };
    });
    this.icons = icons;

    this.isLoadingIcons = false;
    if (this.requestWaitingForIcons.length > 0) {
      this.requestWaitingForIcons.map(awaitingPromise => {
        awaitingPromise.resolve(this.icons);
      });
    }

    return icons;
	}

}
