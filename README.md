# fontawesome-icon-picker

Presents a [material-ui](http://www.material-ui.com/#/) dialog with an up-to-date list of fontawesome icons. allowing the user to pick one.
The chosen icon will be returned in the `onPick` callback.


## Demo & Examples

Live demo of material UI picker: [DMDc0de.github.io/material-ui-icon-picker](http://DMDc0de.github.io/material-ui-icon-picker/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.
```


## Usage

```javascript
import React from 'react';
import MaterialUiIconPicker from 'react-material-ui-icon-picker';

class MyComponent extends React.Component {
    
    showPickedIcon = (icon) => {
        console.info(icon) // prints {name: "access_alarm", code: "e190"}
    }
    
    render() {
        return (
            <MaterialUiIconPicker onPick={this.showPickedIcon} />
        )
    }
}

```

### Properties
| Property|Type|Required|description
| --- | --- | --- | --- |
| **onPick**| *function* | *required* | Gets called when the user chooses an icon |
| **label**| *string* | *optional* | Defaults to `'Pick icon'`, it's the the label of the button that opens the dialog |
| **pickLabel**| *string* | *optional* | Defaults to `'Pick'`, it's the the label of the primary dialog button |
| **cancelLabel**| *string* | *optional* | Defaults to `'Cancel'`, it's the label of the secondary dialog button |
| **modalTitle**| *string* | *optional* | Defaults to `'Material icon picker'`, it's the title of the modal |




### Notes

This project was bootstrapped with [https://github.com/JedWatson/generator-react-component](https://github.com/JedWatson/generator-react-component)

The list gets fetched directly from `https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/codepoints`.
One of the dependencies breaks the build with `npm start` when using
 
```
gulp -v
CLI version 1.4.0
Local version 3.9.1

```
To fix this

```
cd node_modules/gulp-git/
npm install require-dir@0.3.2

```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

See LICENSE

Copyright (c) 2017 Daniele De Matteo.

