import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Map extends React.Component {
    constructor(props) {
        super(props);
        window.addEventListener("resize", evt => {
            this.setState({width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            });
        });
        const {lat, lng} = this.props.initialCenter;
        this.state = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }
    
    componentDidMount(prevProps, prevState) {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            }
        }
        this.loadMap();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap(this.state.currentLocation.lat, this.state.currentLocation.lng, this.props.zoom);
        }
    }
    
    renderChildren() {
        const {children} = this.props;
        
        if (!children) return;
        
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }
    
    recenterMap(lat, lng, zoom) {
        const map = this.map;
        
        const google = this.props.google;
        const maps = google.maps;
        
        if (map) {
            let center = new maps.LatLng(lat, lng)
            map.panTo(center)
            map.setZoom(zoom);
        }
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.Map;
            const node = ReactDOM.findDOMNode(mapRef);
            
            
            let zoom = this.props.zoom;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                disableDefaultUI: true
            })
            this.map = new maps.Map(node, mapConfig);
        }
    }
    
    render() {
        return (
            <div ref='Map' style={{width: this.state.width, height: this.state.height}}>
            Loading map...
            {this.renderChildren()}
            </div>
            )
        }
    }
    
    Map.propTypes = {
        google: PropTypes.object,
        zoom: PropTypes.number,
        initialCenter: PropTypes.object,
        centerAroundCurrentLocation: PropTypes.bool
    }
    
    Map.defaultProps = {
        zoom: 10,
        // England, by default
        initialCenter: { 
            lat: 51.279401,
            lng: 1.079216
        },
        centerAroundCurrentLocation: false
    }
    
    export default Map;