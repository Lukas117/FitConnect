import { size, icon } from '../store.js';

export function setIconOptions() {
	const options = {
		radius: 10,
		color: '#FFFFFF',
		fillColor: '#4285F4',
		fillOpacity: 1
	};

	const r = options.radius;
	const radiusSize = {
		s2: r * 2
	};

	const iconVector = {
		svg:
			`<svg xmlns="http://www.w3.org/2000/svg"
        width="${radiusSize.s2}" height="${radiusSize.s2}"
        version="1.1" viewBox="-${r} -${r}
        ${radiusSize.s2} ${radiusSize.s2}">` +
			'<circle r="' +
			r +
			'" style="' +
			`stroke:${options.color};fill:${options.fillColor};
        fill-opacity:${options.fillOpacity};` +
			'" />' +
			'</svg>'
	};

	size.set(radiusSize);
	icon.set(iconVector);
}
