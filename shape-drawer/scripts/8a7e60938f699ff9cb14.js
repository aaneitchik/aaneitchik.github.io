/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(3);
	__webpack_require__(7);
	__webpack_require__(10);
	__webpack_require__(5);
	__webpack_require__(13);
	__webpack_require__(9);
	__webpack_require__(4);
	__webpack_require__(6);
	module.exports = __webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function() {

		'use strict';

		angular
			.module('shapeDrawer', [
				'ui.bootstrap',
				'ui.bootstrap.popover',
				'mp.colorPicker'
			])
			.run(run);

		/*@ngInject*/
		function run(Stage) {
			window.onload = Stage.init();
		}
	})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		angular
			.module('shapeDrawer')
			.factory('shapeMenu', shapeMenu);

		var constructors = {
			LineSegment: __webpack_require__(3).LineSegment,
			Ray: __webpack_require__(5).Ray,
			StraightLine: __webpack_require__(6).StraightLine,
			Polygon: __webpack_require__(7).Polygon,
			RegularPolygon: __webpack_require__(9).RegularPolygon,
			PolygonalChain: __webpack_require__(10).PolygonalChain,
			Circle: __webpack_require__(11).Circle,
			Ellipse: __webpack_require__(12).Ellipse,
			Rectangle: __webpack_require__(13).Rectangle
		};

		/*@ngInject*/
		function shapeMenu($rootScope, Stage) {
			var service = {
				fillColor: '',
				outlineColor: '',
				vertexNumber: 3,
				drawShape: drawShape
			};

			service.shapes = [
				{
					name: 'Straight Line',
					className: 'StraightLine',
					toolbarTemplate: 'draw/toolbarTemplates/straightLine.template.html',
					active: false
				},
				{
					name: 'Ray',
					className: 'Ray',
					toolbarTemplate: 'draw/toolbarTemplates/ray.template.html',
					active: false
				},
				{
					name: 'Line Segment',
					className: 'LineSegment',
					toolbarTemplate: 'draw/toolbarTemplates/lineSegment.template.html',
					active: false
				},
				{
					name: 'Polygonal Line',
					className: 'PolygonalChain',
					toolbarTemplate: 'draw/toolbarTemplates/polygonalChain.template.html',
					active: false
				},
				{
					name: 'Polygon',
					className: 'Polygon',
					toolbarTemplate: 'draw/toolbarTemplates/polygon.template.html',
					active: false
				},
				{
					name: 'Regular Polygon',
					className: 'RegularPolygon',
					toolbarTemplate: 'draw/toolbarTemplates/regularPolygon.template.html',
					active: false
				},
				{
					name: 'Circle',
					className: 'Circle',
					toolbarTemplate: 'draw/toolbarTemplates/circle.template.html',
					active: false
				},
				{
					name: 'Ellipse',
					className: 'Ellipse',
					toolbarTemplate: 'draw/toolbarTemplates/ellipse.template.html',
					active: false
				},
				{
					name: 'Rectangle',
					className: 'Rectangle',
					toolbarTemplate: 'draw/toolbarTemplates/rectangle.template.html',
					active: false
				}
			];

			return service;

			function drawShape() {
				$rootScope.$on('STAGE_DBL_CLICKED', function (event, selectedShape) {
					var shape = constructors[selectedShape.className](Stage.clickedPoints, service.outlineColor, service.fillColor, service.vertexNumber);
					shape.draw(Stage.stage);
					Stage.clearPoints();
				});
			}
		}
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var Shape = __webpack_require__(4).Shape;

		function LineSegment(points, outline) {
			var that = Shape(points, outline);

			var draw = function (stage) {
				var points = that.getPoints();
				var layer = new Konva.Layer();
				var line = new Konva.Line({
					points: [points[0].x, points[0].y, points[1].x, points[1].y],
					stroke: that.getOutlineColor(),
					strokeWidth: 3,
					draggable: true
				});
				layer.add(line);
				stage.add(layer);
			};

			that.draw = draw;

			return that;
		}

		exports.LineSegment = LineSegment;
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	(function () {

		'use strict';

		function Shape(pointsArray, outline) {
			var center = null;
			var outlineColor = outline;
			var points = pointsArray;

			var draw = function () {
				throw 'AbstractMethodNotImplementedError';
			};

			var location = function () {
				throw 'AbstractMethodNotImplementedError';
			};

			var getCenter = function () {
				return center;
			};

			var setCenter = function(centerPoint) {
				center = centerPoint;
			};

			var getOutlineColor = function () {
				return outlineColor;
			};

			var setOutlineColor = function (outline) {
				outlineColor = outline;
			};

			var getPoints = function () {
				return points;
			};

			var setPoints = function(pointArray) {
				points = pointArray;
			};

			var transformCoordinates = function (pointArray) {
				return pointArray.reduce(function (prev, curr) {
					prev.push(curr.x, curr.y);
					return prev;
				}, []);
			};

			return {
				draw: draw,
				location: location,
				getCenter: getCenter,
				setCenter: setCenter,
				getOutlineColor: getOutlineColor,
				setOutlineColor: setOutlineColor,
				getPoints: getPoints,
				setPoints: setPoints,
				transformCoordinates: transformCoordinates
			};
		}

		exports.Shape = Shape;
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var LineSegment = __webpack_require__(3).LineSegment;

		function Ray(points, outline) {
			var that = LineSegment(points, outline);

			var draw = function (stage) {
				var points = that.getPoints();
				var layer = new Konva.Layer();
				var x1 = points[0].x,
					y1 = points[0].y,
					x2 = points[1].x,
					y2 = points[1].y;
				//Calculate second point coordinates
				var y = (y2 < y1) ? 0 : stage.width();
				var x = x1 + ((y - y1) * (x1 - x2) / (y1 - y2));
				var ray = new Konva.Line({
					points: [x1, y1, x, y],
					stroke: that.getOutlineColor(),
					strokeWidth: 3,
					draggable: true
				});
				layer.add(ray);
				stage.add(layer);
			};

			that.draw = draw;

			return that;
		}

		exports.Ray = Ray;
	})();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var Ray = __webpack_require__(5).Ray;

		function StraightLine(points, outline) {
			var that = Ray(points, outline);

			var draw = function (stage) {
				var points = that.getPoints();
				var layer = new Konva.Layer();
				var x1 = points[0].x,
					y1 = points[0].y,
					x2 = points[1].x,
					y2 = points[1].y;
				//Calculate second point coordinates
				var new_y1 = (y2 < y1) ? stage.width() : 0;
				var new_y2 = (y2 < y1) ? 0 : stage.width();
				var new_x1 = x1 + ((new_y1-y1)*(x1-x2)/(y1-y2));
				var new_x2 = x1 + ((new_y2-y1)*(x1-x2)/(y1-y2));
				var line = new Konva.Line({
					points: [new_x1, new_y1, new_x2, new_y2],
					stroke: that.getOutlineColor(),
					strokeWidth: 3,
					draggable: true
				});
				layer.add(line);
				stage.add(layer);
			};

			that.draw = draw;

			return that;
		}

		exports.StraightLine = StraightLine;
	})();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var WithArea = __webpack_require__(8).WithArea;

		function Polygon(points, outline, fillColor) {
			var that = WithArea(points, outline, fillColor);

			var draw = function (stage) {
				var layer = new Konva.Layer();
				var polygon = new Konva.Line({
					points: that.transformCoordinates(that.getPoints()),
					stroke: that.getOutlineColor(),
					fill: that.getFillColor(),
					closed: true,
					draggable: true
				});
				layer.add(polygon);
				stage.add(layer);
			};

			that.draw = draw;

			return that;
		}

		exports.Polygon = Polygon;
	})();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var Shape = __webpack_require__(4).Shape;

		function WithArea(points, outline, fill) {
			var that = Shape(points, outline, fill);

			if(fill) {
				var fillColor = fill;
			}

			var getFillColor = function () {
				return fillColor;
			};

			var setFillColor = function (fill) {
				fillColor = fill;
			};

			that.getFillColor = getFillColor;
			that.setFillColor = setFillColor;

			return that;
		}

		exports.WithArea = WithArea;
	})();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var Polygon = __webpack_require__(7).Polygon;

		function RegularPolygon(points, outline, fill, verticesNumber) {
			var that = Polygon(points, outline, fill);
			var vertexNumber = verticesNumber;

			var draw = function (stage) {
				var points = that.getPoints();
				var layer = new Konva.Layer();
				var calcRadius = function (first, second) {
					var a = Math.abs(first.x - second.x);
					var b = Math.abs(first.y - second.y);
					return Math.sqrt(a*a + b*b);
				};
				var polygon = new Konva.RegularPolygon({
					x: points[0].x,
					y: points[0].y,
					sides: vertexNumber,
					radius: calcRadius(points[0], points[1]),
					fill: that.getFillColor(),
					stroke: that.getOutlineColor(),
					strokeWidth: 3,
					draggable: true
				});
				layer.add(polygon);
				stage.add(layer);
			};

			var getVertexNumber = function () {
				return vertexNumber;
			};

			var setVertexNumber  = function (verticesNumber) {
				vertexNumber = verticesNumber;
			};

			that.draw = draw;
			that.getVertexNumber = getVertexNumber;
			that.setVertexNumber = setVertexNumber;

			return that;
		}

		exports.RegularPolygon = RegularPolygon;
	})();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var Shape = __webpack_require__(4).Shape;

		function PolygonalChain(points, outline) {
			var that = Shape(points, outline);

			var draw = function (stage) {
				var layer = new Konva.Layer();
				var chain = new Konva.Line({
					points: that.transformCoordinates(that.getPoints()),
					stroke: that.getOutlineColor(),
					strokeWidth: 3,
					closed: false,
					draggable: true
				});
				layer.add(chain);
				stage.add(layer);
			};

			that.draw = draw;

			return that;
		}

		exports.PolygonalChain = PolygonalChain;
	})();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var Ellipse = __webpack_require__(12).Ellipse;

		function Circle(points, outline, fill) {
			var ellipse = Ellipse(points, outline, fill);
			var that = Ellipse(points, outline, fill);
			var pointArray = that.getPoints();

			var draw = function (stage) {
				var calcRadius = function(first, second) {
					var a = Math.abs(first.x - second.x);
					var b = Math.abs(first.y - second.y);
					return Math.sqrt(a*a + b*b);
				};
				var radius = calcRadius(pointArray[0], pointArray[1]);
				ellipse.draw(stage, radius, radius);
			};

			that.draw = draw;

			return that;
		}

		exports.Circle = Circle;
	})();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var WithArea = __webpack_require__(8).WithArea;

		function Ellipse(points, outline, fill) {
			var that = WithArea(points, outline, fill);

			var draw = function (stage, radiusX, radiusY) {
				var points = that.getPoints();
				var layer = new Konva.Layer();
				//If it's the Ellipse we're drawing
				var x = radiusX ? points[0].x : (points[1].x + points[0].x) / 2;
				var y = radiusY ? points[0].y : (points[1].y + points[0].y) / 2;

				var radX = radiusX || Math.abs(points[1].x - points[0].x) / 2;
				var radY = radiusY || Math.abs(points[1].y - points[0].y) / 2;

				var ellipse = new Konva.Ellipse({
					x: x,
					y: y,
					radius: {
						x: radX,
						y: radY
					},
					stroke: that.getOutlineColor(),
					fill: that.getFillColor(),
					draggable: true
				});
				layer.add(ellipse);
				stage.add(layer);
			};

			that.draw = draw;

			return that;
		}

		exports.Ellipse = Ellipse;
	})();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

		'use strict';

		var Polygon = __webpack_require__(7).Polygon;

		function Rectangle(points, outline, fill) {
			var that = Polygon(points, outline, fill);

			var draw = function (stage) {
				var points = that.getPoints();
				var layer = new Konva.Layer();
				//Calculating left corner coordinates depending on point's positions
				var x = (points[0].x > points[1].x) ? points[1].x : points[0].x;
				var y = (points[0].y > points[1].y) ? points[1].y : points[0].y;
				var rect = new Konva.Rect({
					x: x,
					y: y,
					width: Math.abs(points[0].x - points[1].x),
					height: Math.abs(points[0].y - points[1].y),
					stroke: that.getOutlineColor(),
					strokeWidth: 3,
					fill: that.getFillColor(),
					draggable: true
				});

				layer.add(rect);
				stage.add(layer);
			};

			that.draw = draw;

			return that;
		}

		exports.Rectangle = Rectangle;
	})();

/***/ },
/* 14 */
/***/ function(module, exports) {

	(function() {

		'use strict';

		angular
			.module('shapeDrawer')
			.factory('Stage', Stage);

		/*@ngInject*/
		function Stage($rootScope) {
			var service = {
				clickedPoints: [],
				shapeToDraw: null,
				clearPoints: clearPoints,
				clear: clear,
				init: init,
				setShape: setShape
			};

			return service;

			function clearPoints() {
				service.clickedPoints = [];
			}

			function clear() {
				service.stage.clear();
			}

			function init() {
				var containerWidth = $('#drawPanel').width();
				var containerHeight = $('#drawPanel').height();
				service.stage = new Konva.Stage({
					container: 'drawPanel',
					width: containerWidth,
					height: containerHeight
				});

				service.stage.on('contentClick', function() {
					service.clickedPoints.push(service.stage.getPointerPosition());
				});

				service.stage.on('contentDblclick', function() {
					$rootScope.$broadcast('STAGE_DBL_CLICKED', service.shapeToDraw);
				});
			}

			function setShape(shape) {
				service.shapeToDraw = shape;
			}
		}

	})();

/***/ },
/* 15 */
/***/ function(module, exports) {

	(function () {

		'use strict';

		angular
			.module('shapeDrawer')
			.controller('DrawController', DrawController);

		/*@ngInject*/
		function DrawController($scope, shapeMenu, Stage) {
			var vm = this;
			vm.fillColor = '#9ccfea';
			vm.outlineColor = '#9ccfea';
			vm.vertexNumber = 3;

			//Links to popover templates
			vm.fillPopover = 'draw/popovers/fillPopover.html';
			vm.outlinePopover = 'draw/popovers/outlinePopover.html';

			//functions to select tab
			vm.shapeMenu = shapeMenu.shapes;
			vm.selectedShape = {
				name: ''
			};
			vm.selectShape = selectShape;
			vm.clearStage = clearStage;

			shapeMenu.drawShape();

			$scope.$watch('draw.fillColor', function () {
				shapeMenu.fillColor = vm.fillColor;
			});

			$scope.$watch('draw.outlineColor', function () {
				shapeMenu.outlineColor = vm.outlineColor;
			});

			$scope.$watch('draw.vertexNumber', function () {
				shapeMenu.vertexNumber = vm.vertexNumber;
			});

			function selectShape(shape) {
				if (shape.name !== vm.selectedShape.name) {
					vm.selectedShape.active = !vm.selectedShape.active;
					vm.selectedShape = shape;
					Stage.setShape(shape);
				}
				vm.selectedShape.active = !vm.selectedShape.active;
				Stage.clearPoints();
			}

			function clearStage() {
				Stage.clear();
			}

		}

	})();

/***/ }
/******/ ]);