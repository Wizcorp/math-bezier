/**
 * @file Bezier curve and surface functions for different number of control points
 *
 * @author Brice Chevalier
 */

function bezierCurveQuadratic(t, point1, point2, point3) {
	var a = (1 - t) * (1 - t);
	var b = 2 * (1 - t) * t;
	var c = t * t;

	return { x: a * point1[0] + b * point2[0] + c * point3[0], y: a * point1[1] + b * point2[1] + c * point3[1] };
}

exports.curveQuadratic = bezierCurveQuadratic;

function bezierCurveCubic(t, point1, point2, point3, point4) {
	var u = (1 - t);

	var a = u * u * u;
	var b = 3 * u * u * t;
	var c = 3 * u * t * t;
	var d = t * t * t;

	return { x: a * point1[0] + b * point2[0] + c * point3[0] + d * point4[0], y: a * point1[1] + b * point2[1] + c * point3[1] + d * point4[1] };
}

exports.curveCubic = bezierCurveCubic;

function bezierCurveQuartic(t, point1, point2, point3, point4, point5) {
	var u = (1 - t);
	var u2 = u * u;
	var t2 = t * t;

	var a = u2 * u2;
	var b = 4 * u * u2 * t;
	var c = 6 * u2 * t2;
	var d = 4 * u * t2 * t;
	var e = t2 * t2;

	return { x: a * point1[0] + b * point2[0] + c * point3[0] + d * point4[0] + e * point5[0], y: a * point1[1] + b * point2[1] + c * point3[1] + d * point4[1] + e * point5[1] };
}

exports.curveQuartic = bezierCurveQuartic;

function bezierCurveQuintic(t, point1, point2, point3, point4, point5, point6) {
	var u = (1 - t);
	var u2 = u * u;
	var t2 = t * t;

	var a = u2 * u2 * u;
	var b = 5 * u2 * u2 * t;
	var c = 10 * u * u2 * t2;
	var d = 10 * u2 * t2 * t;
	var e = 5 * u * t2 * t2;
	var f = t2 * t2 * t;

	return { x: a * point1[0] + b * point2[0] + c * point3[0] + d * point4[0] + e * point5[0] + f * point6[0], y: a * point1[1] + b * point2[1] + c * point3[1] + d * point4[1] + e * point5[1] + f * point6[1] };
}

exports.curveQuintic = bezierCurveQuintic;

function bezierCurveSextic(t, point1, point2, point3, point4, point5, point6, point7) {
	var u = (1 - t);
	var u2 = u * u;
	var t2 = t * t;

	var a = u2 * u2 * u2;
	var b = 6 * u2 * u2 * u * t;
	var c = 15 * u2 * u2 * t2;
	var d = 20 * u * u2 * t2 * t;
	var e = 15 * u2 * t2 * t2;
	var f = 6 * u * t2 * t2 * t;
	var g = t2 * t2 * t2;

	return { x: a * point1[0] + b * point2[0] + c * point3[0] + d * point4[0] + e * point5[0] + f * point6[0] + g * point7[0], y: a * point1[1] + b * point2[1] + c * point3[1] + d * point4[1] + e * point5[1] + f * point6[1] + g * point7[1] };
}

exports.curveSextic = bezierCurveSextic;


/**
 * @method Bezier curve and surface functions for different number of control points
 *
 * @desc General case for computing the Bezier curve
 * A Bezier curve function takes an input t in [0, 1] and returns a 2D value
 * Complexity in O(plog2(p))
 *
 * @author Brice Chevalier
 *
 * @param {number} t
 * @param {number[]} points Control points in 2D, each in ]-Infinity, Infinity[x]-Infinity, Infinity[
 * @returns {object} Value of the Bezier curve in t
 */

function bezierCurve2D(t, points) {

	var x = 0;
	var y = 0;

	var n = points.length - 1;
	var term = 1;
	var u = (1 - t);

	for (var p = 0; p <= n; p += 1) {
		var a = term * Math.pow(u, n - p) * Math.pow(t, p);
		x += a * points[p][0];
		y += a * points[p][1];
		term *= (n - p) / (p + 1);
	}

	return { x: x, y: y };
}

exports.curve2D = bezierCurve2D;

/**
 * @method Bezier curve and surface functions for different number of control points
 *
 * @desc General case for computing the Bezier curve
 * A Bezier curve function takes an input t in [0, 1] and returns a 3D value
 * Complexity in O(plog2(p))
 *
 * @author Brice Chevalier
 *
 * @param {number} t
 * @param {number[]} points - Control points in 3D, each in ]-Infinity, Infinity[x]-Infinity, Infinity[x]-Infinity, Infinity[
 * @returns {object} Value of the Bezier curve in t
 */

function bezierCurve3D(t, points) {

	var x = 0;
	var y = 0;
	var z = 0;

	var n = points.length - 1;
	var term = 1;
	var u = (1 - t);

	for (var p = 0; p <= n; p += 1) {
		var a = term * Math.pow(u, n - p) * Math.pow(t, p);
		x += a * points[p][0];
		y += a * points[p][1];
		z += a * points[p][2];
		term *= (n - p) / (p + 1);
	}

	return { x: x, y: y, z: z };
}

exports.curve3D = bezierCurve3D;

/**
 * @method Bezier curve and surface functions for different number of control points
 *
 * @desc General case for computing the Bezier surface
 * A Bezier surface function takes an input in [0, 1]^2 and returns b value in ]-Infinity, Infinity[
 * Complexity in O(p^2)
 *
 * @author Brice Chevalier
 *
 * @param {number} t
 * @param {number} u
 * @param {number[]} points - Control points, each in ]-Infinity, Infinity[
 * @returns {object} Value of the Bezier curve in (t, u)
 */

function bezierSurface2D(t, u, points) {

	var x = 0;
	var y = 0;

	var p1 = 0;
	var p2 = 0;
	var n1 = points.length - 1;
	var n2 = points[0].length - 1;
	var a;

	// Precompute the arrays of monovariate bernstein values
	var bernsteinValues1 = [];
	var term1 = 1;
	for (p1 = 0; p1 <= n1; p1 += 1) {
		bernsteinValues1[p1] = term1 * Math.pow(t, p1) * Math.pow(1 - t, n1 - p1);
		term1 *= (n1 - p1) / (p1 + 1);
	}

	var bernsteinValues2 = [];
	var term2 = 1;
	for (p2 = 0; p2 <= n2; p2 += 1) {
		bernsteinValues2[p2] = term2 * Math.pow(u, p2) * Math.pow(1 - u, n2 - p2);
		term2 *= (n2 - p2) / (p2 + 1);
	}

	// Computing the contribution of the control points
	for (p1 = 0; p1 <= n1; p1 += 1) {
		for (p2 = 0; p2 <= n2; p2 += 1) {
			a = bernsteinValues1[p1] * bernsteinValues2[p2];
			x += a * points[p1][p2][0];
			y += a * points[p1][p2][1];
		}
	}

	return { x: x, y: y };
}

exports.surface2D = bezierSurface2D;

function bezierSurface3D(t, u, points) {

	var x = 0;
	var y = 0;
	var z = 0;

	var p1 = 0;
	var p2 = 0;
	var n1 = points.length - 1;
	var n2 = points[2].length - 1;
	var a;

	// Precompute the arrays of monovariate bernstein values
	var bernsteinValues1 = [];
	var term1 = 1;
	for (p1 = 0; p1 <= n1; p1 += 1) {
		bernsteinValues1[p1] = term1 * Math.pow(t, p1) * Math.pow(1 - t, n1 - p1);
		term1 *= (n1 - p1) / (p1 + 1);
	}

	var bernsteinValues2 = [];
	var term2 = 1;
	for (p2 = 0; p2 <= n2; p2 += 1) {
		bernsteinValues2[p2] = term2 * Math.pow(u, p2) * Math.pow(1 - u, n2 - p2);
		term2 *= (n2 - p2) / (p2 + 1);
	}

	// Computing the contribution of the control points
	for (p1 = 0; p1 <= n1; p1 += 1) {
		for (p2 = 0; p2 <= n2; p2 += 1) {
			a = bernsteinValues1[p1] * bernsteinValues2[p2];
			x += a * points[p1][p2][0];
			y += a * points[p1][p2][1];
			z += a * points[p1][p2][2];
		}
	}

	return { x: x, y: y, z: z };
}

exports.surface3D = bezierSurface3D;