// MODIFIED
import React from 'react';
import {RaisedButton, FlatButton, Dialog, FontIcon, LinearProgress} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import IconsStorage from './IconsStorage';
import Radium from 'radium';

class MaterialUiIconPicker extends React.Component {

	iconsStorage;
	styles;

	getStyles() {
		const backgroundBox = {
			backgroundColor: 'rgb(224, 224, 224)',
			borderRadius: 2,
			height: 120,
			opacity: 0,
			position: 'absolute',
			top: 0,
			transitionProperty: 'opacity',
			transitionDuration: '200ms',
			transitionTimingFunction: 'ease-out',
			width: 112,
			marginLeft: 'calc(112px / 2)',
			transform: 'translateX(-50%)',
			transitionDelay: 'initial'
		};

		const selectedBackgroundBox = Object.assign({}, backgroundBox);
		selectedBackgroundBox.opacity = 1;

		return {
			iconsGrid: {
				display: 'flex',
				flexWrap: 'wrap'
			},
			iconsItem: {
				textAlign: 'center',
				width: '25%',
				flexGrow: 1,
				marginBottom: 10,
				position: 'relative',
				height: 120,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				cursor: 'pointer'
			},
			iconsItemCaption: {
				textTransform: 'uppercase',
				fontSize: 10,
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				position: 'relative',
				zIndex: 2,
				maxWidth: 100
			},
			iconsItemIcon: {
				color: 'rgb(117, 117, 117)',
				fontSize: 48,
				width: 48,
				height: 48,
				marginBottom: 10
			},
			backgroundBox: backgroundBox,
			selectedBackgroundBox: selectedBackgroundBox,
			header: {
				wrapper: {
					display: 'flex',
					flexDirection: 'column',
					paddingBottom: 0,
					paddingLeft: 0,
					paddingRight: 0
				},
				input: {
					flex: 1,
					border: 'none',
					padding: 15,
					fontSize: 17,
					margin: '0 40',
					':focus': {
						outline: 'none'
					}
				},
				icons: {},
				title: {
					margin: 0,
					paddingLeft: 24,
					paddingTop: 0,
					paddingRight: 24,
					textTransform: 'uppercase'
				},
				search: {
					boxShadow: 'rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px',
					display: 'flex',
					marginTop: 10,
					position: 'relative',
					zIndex: 4,
					background: '#fff',
					alignItems: 'center',
					paddingLeft: 10,
					paddingRight: 10
				},
				searchIcon: {
					color: '#ddd'
				},
				closeIcon: {
					cursor: 'pointer',
					color: '#555'
				}

			}
		};
	}

	constructor(props) {
		super(props);
    this.iconsStorage = new IconsStorage();
    let iconObj = this.iconsStorage.getIcons();

		this.state = {
			pickerDialogOpen: false,
			_icons: [],
			icons: iconObj,
			icon: null
		};
	}

	componentWillMount() {
		if (!document.querySelector('[href="https://fonts.googleapis.com/icon?family=Material+Icons"]')) {
			const link = document.createElement('link');
			link.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
			link.setAttribute('rel', 'stylesheet');
			document.querySelector('head').appendChild(link);
		}
	}

	componentDidMount() {
		// this.iconsPromise = this.iconsStorage.getIcons();
		this.showIcons(this.state.icons);
		// this.iconsPromise.then(icons => this.showIcons(icons));
	}
	
	showIcons(icons) {
		this.setState({pickerDialogOpen: this.state.pickerDialogOpen, _icons: icons, icons: icons});
	}

	handleOpen() {
		this.setState({
			pickerDialogOpen: true,
			_icons: this.state._icons,
			icons: this.state.icons,
			selected: this.state.selected,
			didSearch: this.state.didSearch
		});
	};

	handleClose() {
		this.setState({
			pickerDialogOpen: false,
			_icons: this.state._icons,
			icons: this.state._icons,
			selected: this.state.selected,
			didSearch: false
		});
	};

	pickAndClose() {
		this.props.onPick(this.state.selected);
		this.handleClose();
	}

	select(icon) {
		this.setState({
			pickerDialogOpen: this.state.pickerDialogOpen,
			icons: this.state.icons,
			_icons: this.state._icons,
			selected: icon,
			didSearch: this.state.didSearch
		});
	}

	filterList(event) {

		if (event.target.value.toLowerCase().length === 0) {
			this.clearSearch();
		} else {
			let updatedList = this.state._icons;
			updatedList = updatedList.filter(function (item) {
				const searchString = item.code + ' ' + item.name;
				const searches = searchString.split('-').map(namePiece => namePiece.search(event.target.value.toLowerCase()) !== -1);
				return searches.indexOf(true) > -1;
			});

			this.setState({
				pickerDialogOpen: this.state.pickerDialogOpen,
				_icons: this.state._icons,
				icons: updatedList,
				selected: this.state.selected,
				didSearch: true
			});

		}
	}

	clearSearch() {
		this.refs.searchInput.value = '';

		this.setState({
			pickerDialogOpen: this.state.pickerDialogOpen,
			_icons: this.state._icons,
			icons: this.state._icons,
			selected: this.state.selected,
			didSearch: false
		});
	}

	render() {
		const styles = this.getStyles();

		const actions = [
			<FlatButton
				label={this.props.cancelLabel}
				primary
				onClick={this.handleClose.bind(this)}
			/>,
			<RaisedButton
				label={this.props.pickLabel}
				primary
				disabled={!this.state.selected}
				onClick={this.pickAndClose.bind(this)}
				icon={this.state.selected ?
					<i className={'fa ' + icon.code}/> : null}
			/>,
		];
		console.log(this.state.icons);
		console.log(typeof this.state.icons);
		const icons = Object.keys(this.state.icons).map((index,icon,lame) => {
			//console.log(index, icon, lame);
			icon = this.state.icons[index];
			return (<div key={index} style={styles.iconsItem} onClick={() => this.select(icon)}>
				<div
					style={this.state.selected && this.state.selected.code === icon.code ? styles.selectedBackgroundBox : styles.backgroundBox}/>
				{/*<FontIcon style={styles.iconsItemIcon} className="material-icons">{icon.name}</FontIcon>*/}
				<i className={'fa ' + icon.code} style={{fontSize: 32}}/>
				<div style={styles.iconsItemCaption}>{icon.code.split('-').join(' ').substr(3)}</div>
			</div>);
		});

		return (
			<MuiThemeProvider>
				<div>
					<RaisedButton onClick={this.handleOpen.bind(this)} label={this.props.label} primary/>

					<Dialog
						autoScrollBodyContent
						title={
							<div style={styles.header.wrapper}>
								<h3 style={styles.header.title}>{this.props.modalTitle}</h3>
								<div style={styles.header.search}>
									<FontIcon className="material-icons" style={styles.header.searchIcon}>search</FontIcon>
									<input ref="searchInput" type="text" style={styles.header.input}
										   placeholder="Search"
										   onChange={this.filterList.bind(this)}/>
									{this.state.didSearch ? <FontIcon style={styles.header.closeIcon} onClick={this.clearSearch.bind(this)}
																	  className="material-icons">close</FontIcon> : null}
								</div>
							</div>
						}
						actions={actions}
						modal={false}
						open={this.state.pickerDialogOpen}
						onRequestClose={this.handleClose.bind(this)}
					>
						{this.state.icons.length > 0 
							? <div style={styles.iconsGrid}>{icons}</div>
							: <LinearProgress mode="indeterminate" />
						}

					</Dialog>
				</div>


			</MuiThemeProvider>
		);
	}
}

MaterialUiIconPicker.propTypes = {
	cancelLabel: PropTypes.string,
	label: PropTypes.string,
	modalTitle: PropTypes.string,
	onPick: PropTypes.func.isRequired,
	pickLabel: PropTypes.string
};

MaterialUiIconPicker.defaultProps = {
	cancelLabel: 'Cancel',
	label: 'Pick icon',
	modalTitle: 'Material icon picker',
	pickLabel: 'Pick'
};

export default Radium(MaterialUiIconPicker);
