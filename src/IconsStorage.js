// MODIFIED
import defer from 'promise-defer';
import iconDefs from './faIcons.json';
let instance = null;

export default class IconsStorage {

	icons;

	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
	}

	getIcons() {
		if (this.icons) {
			return this.icons;
		}

		let data = iconDefs.array;
    const icons = data.map(nameAndCode => {
      const parts = nameAndCode.split(':');
      return {
        code: parts[0],
        name: parts[1]
      };
    });
    this.icons = icons;

    return icons;
	}

}
