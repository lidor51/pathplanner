// Numbers used for converting from pixels to feet and vice versa
const pixelsPerFootNormal = 20.15;
const pixelsPerMeterNormal = pixelsPerFootNormal / 0.3048;
const pixelsPerFoot21 = 35;
const pixelsPerMeter21 = pixelsPerFoot21 / 0.3048;
const pixelsPerFoot22 = (1200.0 / 54.0);
const pixelsPerMeter22 = pixelsPerFoot22 / 0.3048;
const xOffsetNormal = 56;
const xOffset20 = 76.15;
const xOffset21 = 75;
const xOffset22 = 0;
let xPixelOffset = xOffsetNormal;
let pixelsPerFoot = pixelsPerFootNormal;
let pixelsPerMeter = pixelsPerMeterNormal;
const yPixelOffsetNormal = 78;
const yPixelOffset21 = 75;
const yPixelOffset22 = 50;
let yPixelOffset = yPixelOffsetNormal;

class Vector2 {
	/**
	 * Construct a new 2D vector
	 * @param x The x position
	 * @param y The y position
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.magnitude = Math.sqrt((x * x) + (y * y));
	}

	/**
	 * Get the magnitude
	 * @returns {number} The magnitude
	 */
	getMagnitude() {
		return this.magnitude;
	}

	/**
	 * Get the normalized vector
	 * @returns {Vector2} The normalized vector
	 */
	normalized() {
		if (this.magnitude > 0) {
			return Vector2.divide(this, this.magnitude);
		}
		return new Vector2(0, 0);
	}

	/**
	 * Add two points together
	 * @param a Point #1
	 * @param b Point #2
	 * @returns {Vector2} The sum of the two points
	 */
	static add(a, b) {
		return new Vector2(a.x + b.x, a.y + b.y);
	}

	/**
	 * Subtract one point from another
	 * @param a Point #1
	 * @param b Point #2
	 * @returns {Vector2} The difference of the two points
	 */
	static subtract(a, b) {
		return new Vector2(a.x - b.x, a.y - b.y);
	}

	/**
	 * Multiply a vector by a constant
	 * @param a The vector
	 * @param mult The number to multiply by
	 * @returns {Vector2} The product of the vector and number
	 */
	static multiply(a, mult) {
		return new Vector2(a.x * mult, a.y * mult);
	}

	/**
	 * Divide a vector by a constant
	 * @param a The vector
	 * @param div The number to divide by
	 * @returns {Vector2} The dividend of the vector and number
	 */
	static divide(a, div) {
		return new Vector2(a.x / div, a.y / div);
	}
}

class Util {
	/**
	 * Interpolate on a line
	 * @param a Point #1
	 * @param b Point #2
	 * @param t The value to interpolate for. Between 0 and 1
	 * @returns {Vector2} The interpolated point
	 */
	static lerp(a, b, t) {
		return Vector2.add(a, Vector2.multiply(Vector2.subtract(b, a), t));
	}

	/**
	 * Interpolate on a quadratic curve
	 * @param a Point #1
	 * @param b Point #2
	 * @param c Point #3
	 * @param t The value to interpolate for. Between 0 and 1
	 * @returns {Vector2} The interpolated point
	 */
	static quadraticCurve(a, b, c, t) {
		const p0 = Util.lerp(a, b, t);
		const p1 = Util.lerp(b, c, t);
		return Util.lerp(p0, p1, t);
	}

	/**
	 * Interpolate on a quadratic curve
	 * @param a Point #1
	 * @param b Point #2
	 * @param c Point #3
	 * @param d Point #4
	 * @param t The value to interpolate for. Between 0 and 1
	 * @returns {Vector2} The interpolated point
	 */
	static cubicCurve(a, b, c, d, t) {
		const p0 = Util.quadraticCurve(a, b, c, t);
		const p1 = Util.quadraticCurve(b, c, d, t);
		return Util.lerp(p0, p1, t);
	}

	/**
	 * Calculate the slope between two points
	 * @param a Point #1
	 * @param b Point #2
	 * @returns {number} The slope
	 */
	static slope(a, b) {
		const dy = a.y - b.y;
		const dx = a.x - b.x;
		return dy / dx;
	}

	/**
	 * Find the closest point on a line to another point
	 * @param lineStart The start point of the line
	 * @param lineEnd The end point of the line
	 * @param p Find the closest point to this point
	 * @returns {Vector2} The closest point on the line
	 */
	static closestPointOnLine(lineStart, lineEnd, p) {
		const dx = lineEnd.x - lineStart.x;
		const dy = lineEnd.y - lineStart.y;

		if (dx === 0 === dy) {
			return lineStart;
		}

		const t = ((p.x - lineStart.x) * dx + (p.y - lineStart.y) * dy) / (dx * dx + dy * dy);

		let closestPoint;
		if (t < 0) {
			closestPoint = lineStart;
		} else if (t > 1) {
			closestPoint = lineEnd;
		} else {
			closestPoint = Util.lerp(lineStart, lineEnd, t);
		}
		return closestPoint;
	}

	/**
	 * Give the distance between 2 points
	 * @param point1 Point 1
	 * @param point2 Point 2
	 * @returns {number} The distance between the points
	 */
	static distanceBetweenPoints(point1, point2){
		let a = point2.x - point1.x;
		let b = point2.y - point1.y;
		return Math.sqrt(a*a + b*b);
	}
}

module.exports.Vector2 = Vector2;
module.exports.Util = Util;
module.exports.Util.xPixelOffset = xPixelOffset;
module.exports.Util.xOffsetNormal = xOffsetNormal;
module.exports.Util.xOffset20 = xOffset20;
module.exports.Util.xOffset21 = xOffset21;
module.exports.Util.xOffset22 = xOffset22;
module.exports.Util.yPixelOffset = yPixelOffset;
module.exports.Util.yPixelOffsetNormal = yPixelOffsetNormal;
module.exports.Util.yPixelOffset21 = yPixelOffset21;
module.exports.Util.yPixelOffset22 = yPixelOffset22;
module.exports.Util.pixelsPerFoot = pixelsPerFoot;
module.exports.Util.pixelsPerFootNormal = pixelsPerFootNormal;
module.exports.Util.pixelsPerFoot21 = pixelsPerFoot21;
module.exports.Util.pixelsPerFoot22 = pixelsPerFoot22;
module.exports.Util.pixelsPerMeter = pixelsPerMeter;
module.exports.Util.pixelsPerMeterNormal = pixelsPerMeterNormal;
module.exports.Util.pixelsPerMeter21 = pixelsPerMeter21;
module.exports.Util.pixelsPerMeter22 = pixelsPerMeter22;