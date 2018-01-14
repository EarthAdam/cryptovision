// THIS IS WHERE ALL THE 3D TEXT MAGIC HAPPENS
var LOGO	= LOGO	|| {}
var TIME	= TIME	|| {}
var YEAR	= YEAR	|| {}
var MONTH	= MONTH	|| {}
var DAY	= DAY	|| {}
var HOUR	= HOUR	|| {}
var NAME	= NAME	|| {}
var BUTTON	= BUTTON	|| {}
var monthText = [];
var houseText = [];
hourSet = [];
var daySet = [];
var mox = [];
var moy = [];
var moz = [];
var nameNum = 0;
nameArray = [];
var hourArray=[];

var monthNum = 0;

function GridXZ(){
	var gridXZ = new THREE.GridHelper(1000,50);
	gridXZ.setColors(new THREE.Color(0x998100), new THREE.Color(0x998100));
	gridXZ.position.set(500,-adj,500);
	return gridXZ;
}
function PresentGrid(){
	var gridXZ = new THREE.GridHelper(1000,10);
	gridXZ.setColors(new THREE.Color(0x111111), new THREE.Color(0x111111));
	gridXZ.position.set(0,(breakupDayDate('2015-01-01T08:30:00.00Z')-Julian)*scrunch,0);
	return gridXZ;
}
function FutureGrid(){
	var gridXZ = new THREE.GridHelper(1000,10);
	gridXZ.setColors(new THREE.Color(0x111111), new THREE.Color(0x111111));
	gridXZ.position.set(500,(365),500);
	return gridXZ;
}
	
function BeginYear(){
	var geometry = new THREE.TorusGeometry( distance, 0.05, 16, 100 );
	var material = new THREE.MeshBasicMaterial( { color: 0xB29600 } );
	var torus = new THREE.Mesh( geometry, material );
	torus.rotation.x =  Math.PI / 2;
	torus.position.y = -Julian*scrunch;
	return torus;
}
function EndYear(){
	var geometry = new THREE.TorusGeometry( distance, 0.05, 16, 100 );
	var material = new THREE.MeshBasicMaterial( { color: 0xB29600 } );
	var torus = new THREE.Mesh( geometry, material );
	torus.rotation.x =  Math.PI / 2;
	torus.position.y = (365-Julian)*scrunch;
	return torus;
}
function NextYear(){
	var geometry = new THREE.TorusGeometry( distance, 0.05, 16, 100 );
	var material = new THREE.MeshBasicMaterial( { color: 0xB29600 } );
	var torus = new THREE.Mesh( geometry, material );
	torus.rotation.x =  Math.PI / 2;
	torus.position.y = (2*365-Julian)*scrunch;
	return torus;
}

function TimeFrame(){
	var tube = 1;
	var radialSegments = 365;
	var tubularSegments = 2;
	var tube = 0.2;
	var material = new THREE.MeshBasicMaterial( { color: 0x444444 } );
	var geometry = new THREE.TorusGeometry( distance, tube, radialSegments, tubularSegments );
	var TopHelix = new THREE.Object3D();
	
	var torus = new THREE.Mesh( geometry, material );
	//TopHelix = createHelix(clockwise, radius-10, height, arc, radialSegments, tubularSegments, tube, material, bottom));
	//TopHelix.position.set(0,10,0);
	//scene.add(TopHelix);
}
	
function Harmonics(){
	//NPole
	var bottom = new THREE.Vector3();
  	bottom.set(0,adj, 0);
	var helix = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial( { color: 'gold'} );
	helix = createHelix(false, 1, 1, 1, 100, 5, 0.5, material, bottom);
	helix.position.y = -Julian+0.5;
	scene.add(helix);
	helix.position.y = -Julian+1.5;
	scene.add(helix);
	//Noon
	var bottom = new THREE.Vector3();
  	bottom.set(0,adj, 0);
	var helix = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial( { color: 'gold'} );
	helix = createHelix(false, 7, 7, 1, 100, 5, 0.5, material, bottom);
	helix.position.y = -Julian+3.5;
	scene.add(helix);
	
	var bottom = new THREE.Vector3();
  	bottom.set(0,adj, 0);
	var helix = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial( { color: 'gold'} );
	helix = createHelix(false, 30, 30, 1, 100, 5, 0.5, material, bottom);
	helix.position.y = -Julian+15;
	scene.add(helix);
	
	var bottom = new THREE.Vector3();
  	bottom.set(0,adj, 0);
	var helix = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial( { color: 'gold'} );
	helix = createHelix(false, 90, 90, 1, 100, 5, 0.5, material, bottom);
	helix.position.y = -Julian+45;
	scene.add(helix);
	
	var bottom = new THREE.Vector3();
  	bottom.set(0,adj, 0);
	var helix = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial( { color: 'gold'} );
	helix = createHelix(false, 180, 180, 1, 100, 5, 0.5, material, bottom);
	helix.position.y = -Julian+90;
	scene.add(helix);
	/*
	var geometry = new THREE.CylinderGeometry( 200, 200, 365, 12 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true});
	var cylinder = new THREE.Mesh( geometry, material );
	scene.add( cylinder );
	*/
	renderer.render(scene, camera);
	
    }

function createHelix(clockwise, radius, height, arc, radialSegments, tubularSegments, tube, material, bottom) {
	
	// var clockwise = false;
	var height = 365;
	// var arc = 1;
	var radialSegments = 24;
	// var tubularSegments = 2;
	// var tube = 0.1;
	// var material = new THREE.MeshBasicMaterial( { color: color_of_day } );
	// var bottom = new THREE.Vector3();
	// var material = new THREE.MeshBasicMaterial( { color: 0x017FFF } );
	
	var helix = new THREE.Geometry();
	var mesh = new THREE.Mesh( helix, material );
	var top = new THREE.Vector3();
	var openBottom = false;
	var openTop = false;
	
    var sine_sign = clockwise ? 1 : -1;
    bottom.set(radius,-height/2, 0);
    //helix.position.set(0,-Julian,0);
    for (var i = 1; i <= arc * radialSegments; i++) {
		mesh.rotation.y = 3*Math.PI/2;
        // going from X to Z axis
        top.set(radius * Math.cos(i * 2 * Math.PI / radialSegments),
            height * (i / (arc * radialSegments)) - height / 2,
            sine_sign * radius * Math.sin(i * 2 * Math.PI / radialSegments));
        var capsule = createCapsule(material, tube, top, bottom, tubularSegments, openTop, openBottom);
		
 	    mesh.add(capsule);
 	    // after first capsule is laid down, don't need to draw sphere for bottom.
 	    openBottom = true;
 	    // make top of previous capsule the bottom of the next one
 	    bottom.copy(top);
 	}
return mesh;
}
//Renders an event path circling around the Earth for each event















function LAMDENroadmap() {
	var start = -4;
	var end = 4;
	var material = new THREE.LineBasicMaterial({color: 0x00ff00 });
	var geometry = new THREE.Geometry();

	for(i=start;i<=end;i++){
		geometry.vertices.push(new THREE.Vector3((i*scrunch),0,0));
	}
	geometry.vertices.push(new THREE.Vector3((end*scrunch),1,0.1));			
	for(k=end;k>=start;k--){	
		geometry.vertices.push(new THREE.Vector3((k*scrunch),1,0));
	}
	for(k=start;k<=end;k++){	
		geometry.vertices.push(new THREE.Vector3((k*scrunch),-1,0));
	}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,0,0);
	scene.add(line);
	
	HourLabels();
	//grid();
}

function HourLabels(){
	var radius = 25;
	hourArray[0] = 'Q2 2017: Begin Development';
	hourArray[1] = 'Q4 2017: Pre-Sale Begins';
	hourArray[2] = 'Q1 2018: Token Sale';
	hourArray[2] = 'Q2 2018: Develop';
	hourArray[3] = 'Q3 2018: Launch ';
	hourArray[4] = 'Q4 2018: Partner';
	for(i=0;i<=4;i++){
		HOUR.Text(hourArray[i]);
		hr.position.set(
			i*80-140,
			10,
			0);
		hourSet[i] = hr;
	}
	/*
	var geometry1 = new THREE.TorusGeometry( radius, 0.001, 16, 100 );
	var geometry2 = new THREE.TorusGeometry( radius*1.2, 0.001, 16, 100 );
	var material = new THREE.MeshPhongMaterial( { color: 'white' } );
	material.transparent = true;
	inner = new THREE.Mesh( geometry1, material );
	outer = new THREE.Mesh( geometry2, material );
	inner.position.set(0,0,0);
	outer.position.set(0,0,0);
	scene.add(inner);
	scene.add(outer);
	
	var material2 = new THREE.LineBasicMaterial({color: 'white' });
	var geometry3 = new THREE.Geometry();
	geometry3.vertices.push(new THREE.Vector3(0,-radius*0.9,0));
	geometry3.vertices.push(new THREE.Vector3(0,0,0));
	hourHand = new THREE.Line(geometry3, material2);
	scene.add(hourHand);
	*/
}
HOUR.Text	= function(text, options){
options	= options || {
		font		: "gentilis",
		weight		: "bold",
		size		: 5,
		height		: 0.001,
	}

	// create the tGeometry
	var geometry	= new THREE.TextGeometry(text, options);

	// center the geometry
	// - THREE.TextGeometry isnt centered for unknown reasons. all other geometries are centered
	geometry.computeBoundingBox();
	var center	= new THREE.Vector3();
	center.x	= (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2;
	center.y	= (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2;
	center.z	= (geometry.boundingBox.max.z - geometry.boundingBox.min.z) / 2;
	geometry.vertices.forEach(function(vertex){
		vertex.sub(center);
	})
	
	// create a mesh with it
	var material	= new THREE.MeshBasicMaterial({color:'white'});
	hr	= new THREE.Mesh(geometry, material);
	
	// return mesh
	scene.add(hr);
	// EarthScene.rotation.y = (3+currentDate.getHours())/24*Math.PI;
	// EarthScene.rotation.x = planetX[2]*23.5*Math.PI/180*Math.PI*i/24;
	// EarthScene.position.set(planetX[2],0,planetZ[2]);
}
function grid(){
	var material = new THREE.LineBasicMaterial({color: 'white' });
	var geometry = new THREE.Geometry();
	for(h=-5;h<=5;h++){
		for(i=-4;i<=4;i++){
			geometry.vertices.push(new THREE.Vector3((i*scrunch),-20,h*10));
		}
	}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,0,0);
	scene.add(line);
}

function triangleGrid(){
	for (h=0;h<=2;h++){
		for (i=0;i<=11;i++){
		var geom = new THREE.Geometry();

		var triangle = new THREE.Triangle( new THREE.Vector3(-150+i*40-(Math.abs(h-1)*20),-20,(h-1)*70), new THREE.Vector3(-180+i*40-(Math.abs(h-1)*20),-20,30+(h-1)*70), new THREE.Vector3(-180+i*40-(Math.abs(h-1)*20),-20,-30+(h-1)*70) );
		var normal = triangle.normal();
	  
		// An example of getting the area from the Triangle class
		console.log( 'Area of triangle is: '+ triangle.area() );

		geom.vertices.push(triangle.a);
		geom.vertices.push(triangle.b);
		geom.vertices.push(triangle.c);
		
		geom.faces.push( new THREE.Face3( 0, 1, 2, normal ) );
		
		var material = new THREE.MeshPhongMaterial();
		material.side = THREE.DoubleSide;
		var mesh= new THREE.Mesh( geom, material );
		scene.add(mesh);
	}
	}
	
	
}

function LAMDENlogo(){
	var logoMask = THREE.ImageUtils.loadTexture('img/Logo.png');
	logoMask.wrapS = THREE.RepeatWrapping;
	logoMask.wrapT = THREE.RepeatWrapping;
	logoMask.repeat.set( 2, 2 );

	var logoDiffuse = THREE.ImageUtils.loadTexture("img/Logo.png");
	logoDiffuse.wrapS = THREE.RepeatWrapping;
	logoDiffuse.wrapT = THREE.RepeatWrapping;
	logoDiffuse.repeat.set( 2, 2 );

	
	var geometry   = new THREE.PlaneGeometry( 200, 200, 1 );
	var material  = new THREE.MeshBasicMaterial();
	material.map = logoMask;
	material.alphaMap = logoDiffuse;
	material.transparent = true;
	material.side = THREE.DoubleSide;
	
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0,100,-200);
	scene.add(mesh);
}
















function createEvent(SD, ED, colour, title) {
	var start = breakupDate(SD);
	var end = breakupDate(ED);
	var radius = 250*rScale;
	var sat = 30;
	var gap = 0.99;
	var earth = 'green';
	var material = new THREE.LineBasicMaterial({color: colour });
	var geometry = new THREE.Geometry();

	for(i=start;i<=end;i+=5){
	var j = i%(24*60);		
		geometry.vertices.push(new THREE.Vector3(
			-radius*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(i*scrunch)/24/60,
			-radius*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));}
	var j = end%(24*60);
	geometry.vertices.push(new THREE.Vector3(
			-radius*gap*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(end*scrunch)/24/60,
			-radius*gap*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));			
	for(k=end;k>=start;k-=5){
	var j = k%(24*60);		
		geometry.vertices.push(new THREE.Vector3(
			-radius*gap*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(k*scrunch)/24/60,
			-radius*gap*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));}
	for(k=start;k<=end;k+=5){
	var j = k%(24*60);		
		geometry.vertices.push(new THREE.Vector3(
			-radius*(gap+0.025)*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(k*scrunch)/24/60,
			-radius*(gap+0.025)*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
	));}

	var line = new THREE.Line(geometry, material);
	line.position.set(0,0,0);
	line.rotation.x = -Math.PI/2;
	line.rotation.y = Math.PI;
	scene.add(line);
	NAME.Text(title, colour, radius*0.75*Math.sin((start+(end-start)/2)*360/24/60*Math.PI/180-Math.PI),radius*0.75*Math.cos((start+(end-start)/2)*360/24/60*Math.PI/180+Math.PI),-((start+(end-start)/2)*scrunch)/24/60);
	
}
function spiralPlot(SD, title, colour, y) {
	var start = breakupDate(SD);;
	var end = start+y.length;
	var scaler = 500;
	var radius = 250*rScale;
	var gap = 0.95;
	var material = new THREE.LineBasicMaterial({color: colour });
	var geometry = new THREE.Geometry();

	for(i=start;i<end;i++){
	var j = i%(24*60);
	var m = i%start;
		geometry.vertices.push(new THREE.Vector3(
			(-radius*gap+y[m]/scaler)*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(i*scrunch)/24/60,
			(-radius*gap+y[m]/scaler)*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));
		}
	for(k=end;k>=start;k--){
	var j = k%(24*60);		
		geometry.vertices.push(new THREE.Vector3(
			-radius*0.99*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(k*scrunch)/24/60,
			-radius*0.99*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));}
	geometry.vertices.push(new THREE.Vector3(
			(-radius*gap+y[0]/scaler)*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(k*scrunch)/24/60,
			(-radius*gap+y[0]/scaler)*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));

	var line = new THREE.Line(geometry, material);
	line.position.set(0,0,0);
	line.rotation.x = -Math.PI/2;
	line.rotation.y = Math.PI;
	scene.add(line);
	// NAME.Text(title, colour,  radius*0.75*Math.sin((start+(end-start)/2)*360/24/60*Math.PI/180-Math.PI),radius*0.75*Math.cos((start+(end-start)/2)*360/24/60*Math.PI/180+Math.PI),-((start+(end-start)/2)*scrunch)/24/60);
	// NAME.Text(start, colour,  radius*0.75*Math.sin(start*360/24/60*Math.PI/180-Math.PI),radius*0.75*Math.cos(start*360/24/60*Math.PI/180+Math.PI),-(start*scrunch)/24/60);
	
}
function Plot(fromCoin,toCoin,span,coinColor,depth){	
	var y=[];
	var height;
	var request = new XMLHttpRequest();
	request.open('GET','https://min-api.cryptocompare.com/data/histo'+span+'?fsym='+fromCoin+'&tsym='+toCoin+'&limit=60&aggregate=3&e=CCCAGG');
	request.onload = function(){
		var data = JSON.parse(request.responseText);
		console.log(data.Data.length);
		console.log(data.Data);
		for (i=0;i<data.Data.length;i++){
			y[i] = data.Data[i].close;
			//console.log(y[i]);
		}
		console.log(y);
		var geometry = new THREE.Geometry();var start = y[0];
		var end = y.length;
		console.log(Math.min.apply(Math,y));
		var scaler = 0.1;
		if(span == 'day')
			height = -120;
		else if(span=='hour')
			height = 0;
		else if(span=='minute')
			height = 120;
		for (j=0;j<y.length;j++){
			geometry.vertices.push(new THREE.Vector3(j/scaler,y[j]/scaler/Math.max.apply(Math,y)*10+height,depth));
			
		}
		var material = new THREE.LineBasicMaterial({color: coinColor });
		var line = new THREE.Line(geometry, material);
		line.position.set(-30/scaler,0,-14/scaler);
		scene.add(line);
		
		var geometry2 = new THREE.Geometry();
		geometry2.vertices.push(new THREE.Vector3((end+1)/scaler,0+height,depth));
		geometry2.vertices.push(new THREE.Vector3(0,0+height,depth));
		geometry2.vertices.push(new THREE.Vector3(0,11/scaler+height,depth));
		geometry2.vertices.push(new THREE.Vector3((end+1)/scaler,11/scaler+height,depth));
		geometry2.vertices.push(new THREE.Vector3((end+1)/scaler,0+height,depth));
		var material2 = new THREE.LineBasicMaterial({color: 'white' });
		var line2 = new THREE.Line(geometry2, material2);
		line2.position.set(-30/scaler,0,-14/scaler);
		scene.add(line2);
	}
	request.send();
	/*
	var arr_from_json ='https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG';
	var y;
	$.ajax({
		method: 'GET',
		url: arr_from_json,
	  }).done(function(data) {
		  for (i=0;i<=data.length;i++){
			  y[i] = data[i].close;
		  }
	  });
	
	*/
	
}
function closeFrame(SD, ED, color_of_day) {
	var start = breakupDate(SD);
	var end = breakupDate(ED);
	var radius = (250*rScale);
	var sat = 30;
	var gap = 0.99;
	var earth = 'green';
	var material = new THREE.LineBasicMaterial({color: color_of_day });
	var geometry = new THREE.Geometry();
	// geometry.vertices.push(new THREE.Vector3(
			// distance*Math.sin(start/24/60*(360/365)*Math.PI/180)-radius*gap*Math.sin(start*360/24/60*Math.PI/180-Math.PI+start/24/60*(360/365)*Math.PI/180),
			// (start*scrunch)/24/60-(radius*gap*Math.sin(23.5*Math.PI/180))*Math.sin(start*360/24/60*Math.PI/180+Math.PI/2+start/24/60*(360/365)*Math.PI/180),
			// distance*Math.cos(start/24/60*(360/365)*Math.PI/180)-radius*gap*Math.cos(start*360/24/60*Math.PI/180+Math.PI+start/24/60*(360/365)*Math.PI/180)
		// ));
	for(i=start;i<=end;i+=5){
	var j = i%(24*60);		
		geometry.vertices.push(new THREE.Vector3(
			-radius*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			(i*scrunch)/24/60,
			-radius*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));}
	// geometry.vertices.push(new THREE.Vector3(
			// distance*Math.sin(end/24/60*(360/365)*Math.PI/180)-radius*gap*Math.sin(j*360/24/60*Math.PI/180-Math.PI+i/24/60*(360/365)*Math.PI/180),
			// (end*scrunch)/24/60-(radius*gap*Math.sin(23.5*Math.PI/180))*Math.sin(end*360/24/60*Math.PI/180+Math.PI/2+end/24/60*(360/365)*Math.PI/180),
			// distance*Math.cos(end/24/60*(360/365)*Math.PI/180)-radius*gap*Math.cos(j*360/24/60*Math.PI/180+Math.PI+i/24/60*(360/365)*Math.PI/180)
		// ));			
	// for(k=end;k>=start;k-=5){
	// var j = k%(24*60);		
		// geometry.vertices.push(new THREE.Vector3(
			// distance*Math.sin(k/24/60*(360/365)*Math.PI/180)-radius*gap*Math.sin(j*360/24/60*Math.PI/180-Math.PI+k/24/60*(360/365)*Math.PI/180),
			// (k*scrunch)/24/60-(radius*gap*Math.sin(23.5*Math.PI/180))*Math.sin(j*360/24/60*Math.PI/180+Math.PI/2+k/24/60*(360/365)*Math.PI/180),
			// distance*Math.cos(k/24/60*(360/365)*Math.PI/180)-radius*gap*Math.cos(j*360/24/60*Math.PI/180+Math.PI+k/24/60*(360/365)*Math.PI/180)
		// ));}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,0,0);
	line.rotation.x = -Math.PI/2;
	line.rotation.y = Math.PI;
	scene.add(line);
}
function createWeek() {
	//Creates frame for weekly schedule
	var radius =11;
	// var start = SD*24*60+startTime*60;	
	// var end = ED*24*60+endTime*60;
	
	var material = new THREE.LineBasicMaterial({color: 'gold' });
	var geometry = new THREE.Geometry();
	for (i=0;i<=30;i++){
		geometry.vertices.push(new THREE.Vector3(
			radius*Math.sin((i-15)*Math.PI/180),
			0,
			radius*Math.cos((i-15)*Math.PI/180)
		));
		}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,-7.4,-5);
	line.rotation.x = -90*Math.PI/180;
	// scene.add(line);
	camera.add(line);
}
function createLargeEvent(startDate, endDate, rad, color_of_arc, name) {
	
	var radialSegments = 365;
	var height = (endDate-startDate);
	var radius = rad;
	var inc = 0.1;
	var earth = 'green';
	var material = new THREE.LineBasicMaterial({color: color_of_arc });
	material.fog = false;
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(
			(radius)*Math.sin((startDate-365)*Math.PI/(radialSegments/2)),
			(startDate-365)*scrunch,
			(radius)*Math.cos((startDate-365)*Math.PI/(radialSegments/2))
		));
	for(i=startDate;i<=endDate;i++){	
		geometry.vertices.push(new THREE.Vector3(
			radius*Math.sin((i-365)*Math.PI/(radialSegments/2)),
			(i-365)*scrunch,
			radius*Math.cos((i-365)*Math.PI/(radialSegments/2))
		));
	}
	for(i=endDate;i>=startDate;i-=1){	
		geometry.vertices.push(new THREE.Vector3(
			(radius-inc)*Math.sin((i-365)*Math.PI/(radialSegments/2)),
			(i-365)*scrunch,
			(radius-inc)*Math.cos((i-365)*Math.PI/(radialSegments/2))
		));
	}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,-Julian*scrunch,0);
	scene.add(line);
	
	var mid = (height/2+(startDate*360/365));
	var textX = (rad)*Math.cos(((mid-91)*360/365)*Math.PI / (radialSegments/2))+Math.PI/2;
	var textY = ((mid-adj)-365)*scrunch;
	var textZ = -(rad)*Math.sin(((mid-91)*360/365)*Math.PI / (radialSegments/2))+Math.PI/2;
	// NAME.Text(name, color_of_arc, textX, textY, textZ);
	// eventNum++;
	// events[eventNum-1] = NAmesh;
}
function createLargeREvent(startDate, endDate, rad, color_of_arc, name) {
	var start = breakupDayDate(startDate);
	var end = breakupDayDate(endDate);
	var radialSegments = 365;
	var height = (end-start);
	var radius = rad;
	var inc = 0.01;
	var earth = 'green';
	var material = new THREE.LineBasicMaterial({color: color_of_arc, linewidth: 5 });
	material.fog = false;
	var geometry = new THREE.Geometry();
	// geometry.vertices.push(new THREE.Vector3(
			// 1.2,start*scrunch,0
		// ));
	for(i=start;i<=end;i++){	
		geometry.vertices.push(new THREE.Vector3(
			0,1.03*rad,-i*scrunch
		));
	}
	for(i=end;i>=start;i-=1){	
		geometry.vertices.push(new THREE.Vector3(
			0,1*rad,-i*scrunch
		));
	}
	var line = new THREE.Line(geometry, material);
	// line.position.set(0,-Julian*scrunch,0);
	// line.rotation.x = Math.PI/2;
	scene.add(line);
	
	var mid = (height/2+(start));
	var textX = (radius+3)*Math.sin((mid)*Math.PI / (radialSegments/2))+Math.PI/2;
	var textY = (mid-adj)*scrunch;
	var textZ = (radius+3)*Math.cos((mid)*Math.PI / (radialSegments/2))+Math.PI/2;
	// NAME.Text(name, color_of_arc, textX, textY, textZ);
	// eventNum++;
	// events[eventNum-1] = NAmesh;
}
function eventCylinder(startDate, endDate, rad, color_of_cyl){
	var start = breakupDayDate(startDate)*scrunch;
	var end = breakupDayDate(endDate)*scrunch;
	var height = (end-start);
	var geometry = new THREE.CylinderGeometry( rad, rad, height, 12,5,true );
	var material = new THREE.MeshBasicMaterial( {color: color_of_cyl} );
	material.transparent = true;
	material.opacity = 0.3;
	var material2 = new THREE.MeshBasicMaterial( {color: color_of_cyl} );
	material2.wireframe = true;
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.set(0,0,-start-height/2);
	var cylinder2 = new THREE.Mesh( geometry, material2 );
	cylinder2.position.set(0,0,-start-height/2);
	cylinder.rotation.x = Math.PI/2;
	cylinder2.rotation.x = Math.PI/2;
	scene.add( cylinder );
	scene.add( cylinder2 );
}
function PlotImage(file, day, reach){
	imageNum++;
	var img = new THREE.MeshLambertMaterial({
		emissive:'white',
		map:THREE.ImageUtils.loadTexture(file)
	});
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10),img);
	plane.overdraw = true;
	plane.position.set((distance+reach)*Math.sin(day*Math.PI/180),(day-Julian)*scrunch,(distance+reach)*Math.cos(day*Math.PI/180));
		images[imageNum-1] = plane;
		// scene.add(images[imageNum-1]);
	}
function PlotFlatImage(file, day){
	var img = new THREE.MeshLambertMaterial({
		emissive:'white',
		map:THREE.ImageUtils.loadTexture(file)
	});
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 50),img);
	plane.overdraw = true;
	plane.position.set(0,(day-Julian)*scrunch,0);
	plane.rotation.x = -Math.PI/2;
	scene.add(plane);
	}
function PlotRoundImage(file,radius,date){
	var y = (breakupDayDate(date)-Julian)*scrunch;
	var img = new THREE.MeshBasicMaterial({
		map:THREE.ImageUtils.loadTexture(file)
	});
	var plane = new THREE.Mesh(new THREE.CircleGeometry(radius, 360),img);
	plane.overdraw = true;
	plane.position.set(0,y,0);
	plane.rotation.x = -Math.PI/2;
	scene.add(plane);
	}
function PlotCamImage(file, x, y){
	var img = new THREE.MeshLambertMaterial({
		emissive:'white',
		map:THREE.ImageUtils.loadTexture(file)
	});
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),img);
	plane.overdraw = true;
	plane.position.set(x, y, -50);
	camera.add(plane);
}

function Zero(){				//RENDERS PATH OF EARTH IN FLAT FORMAT
	var radius = 25*rScale*-.95;
	var sat = 30;
	var time = 8760;
	var earth = 'gold';
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: EarthColor });
	var material2 = new THREE.LineBasicMaterial({color: MoonColor, linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	for(i=0;i<=time;i++){
	var j = i%24;		
		geometry.vertices.push(new THREE.Vector3(
			distance*Math.sin(i/24*(360/365)*Math.PI/180)-radius*Math.sin(j*360/24*Math.PI/180-Math.PI+i/24*(360/365)*Math.PI/180),
			-(radius*Math.sin(23.5*Math.PI/180))*Math.sin(j*360/24*Math.PI/180+Math.PI/2+i/24*(360/365)*Math.PI/180),
			distance*Math.cos(i/24*(360/365)*Math.PI/180)-radius*Math.cos(j*360/24*Math.PI/180+Math.PI+i/24*(360/365)*Math.PI/180)
		));
	}
	Flatline = new THREE.Line(geometry, material);
	Flatline.position.set(0,0,0);
	Flatline.rotation.y = -11*360/365*Math.PI/180;
	sunMesh.add(Flatline);
}
function ZeroMoon(){		//RENDERS PATH OF MOON IN FLAT FORMAT
	var radius = 9*rScale;
	var sat = 30*rScale;
	var time = 9000;
	var earth = 0x5B92E5;
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: EarthColor });
	var material2 = new THREE.LineBasicMaterial({color: MoonColor, linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	for(i=-160;i<=time;i++){
	var j = i%24;		
		moon.vertices.push(new THREE.Vector3(
			distance*Math.sin(i/24*(360/365)*Math.PI/180)+sat*Math.sin((i-160)/24*11*Math.PI/180),
			-(radius*Math.sin(5.14*Math.PI/180))*Math.sin(i*12/24*Math.PI/180-Math.PI/2),
			distance*Math.cos(i/24*(360/365)*Math.PI/180)-sat*Math.cos((i-160)/24*11*Math.PI/180)
		));
	
	}
	var line = new THREE.Line(geometry, material);
	var line2 = new THREE.Line(moon, material2);
	line.position.set(0,0,0);
	line2.position.set(0,0,0);
	scene.add(line);
	scene.add(line2);
}
function Two(pNum){				//RENDERS PATH OF EARTH IN ASCENDING FORMAT
	var radius = planetR[pNum]*rScale*1;
	var sat = 0.03;
	var time = 8760;
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: pColor[pNum] });
	material.fog = false;
	var material2 = new THREE.LineBasicMaterial({color: MoonColor, linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	for(i=-time*5;i<=time*55;i++){
	var j = i%(24);		
		cogX = distance*planetDis[pNum]*Math.sin((align[pNum]+(i/24-align[pNum])*Vrot[pNum])*(360/365)*Math.PI/180);
		cogZ = distance*planetDis[pNum]*Math.cos((align[pNum]+(i/24-align[pNum])*Vrot[pNum])*(360/365)*Math.PI/180);
		surfX = radius*Math.sin(j*360/24*Math.PI/180-Math.PI+i/24*(360/pDays[pNum])*Math.PI/180);
		surfZ = radius*Math.cos(j*360/24*Math.PI/180+Math.PI+i/24*(360/pDays[pNum])*Math.PI/180);
		
		geometry.vertices.push(new THREE.Vector3(
			cogX-surfX,
			(i*scrunch)/24-(radius*Math.sin(23.5*Math.PI/180))*Math.sin(j*360/24*Math.PI/180+Math.PI/2+i/24*(360/pDays[pNum])*Math.PI/180),
			cogZ-surfZ
		));
		moon.vertices.push(new THREE.Vector3(
			distance*Math.sin(i/24*(360/365)*Math.PI/180)+sat*Math.sin((i)/24*11*Math.PI/180),
			(i*scrunch)/24-(radius*Math.sin(5.14*Math.PI/180))*Math.sin(i*12/24*Math.PI/180-Math.PI/2),
			distance*Math.cos(i/24*(360/365)*Math.PI/180)-sat*Math.cos((i)/24*11*Math.PI/180)
		));
		
	}
	var line = new THREE.Line(geometry, material);
	var line2 = new THREE.Line(moon, material2);
	line.position.set(0,-Julian*scrunch,0);
	line2.position.set(0,-Julian*scrunch,0);
	scene.add(line);
	scene.add(line2);
}
function TwoT(pNum){				//RENDERS PATH OF EARTH IN ASCENDING FORMAT
	var radius = planetR[pNum]*rScale*1.5;
	var sat = 30;
	var time = 8760;
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: pColor[pNum] });
	material.fog = false;
	var material2 = new THREE.LineBasicMaterial({color: 'gray', linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	for(i=-time*10;i<=time*55;i+=10){
	var j = i%(24);		
		cogX = distance*planetDis[pNum]*Math.sin((align[pNum]+(i/24-align[pNum])*Vrot[pNum])*(360/365)*Math.PI/180);
		cogZ = distance*planetDis[pNum]*Math.cos((align[pNum]+(i/24-align[pNum])*Vrot[pNum])*(360/365)*Math.PI/180);
		
		geometry.vertices.push(new THREE.Vector3(
			cogX,
			(i*scrunch)/24,
			cogZ
		));
		// moon.vertices.push(new THREE.Vector3(
			// distance*Math.sin(i/24*(360/365)*Math.PI/180)+sat*Math.sin((i+250)/24*11*Math.PI/180),
			// (i*scrunch)/24-(radius*Math.sin(5.14*Math.PI/180))*Math.sin(i*12/24*Math.PI/180-Math.PI/2),
			// distance*Math.cos(i/24*(360/365)*Math.PI/180)-sat*Math.cos((i+250)/24*11*Math.PI/180)
		// ));
		
	}
	var line = new THREE.Line(geometry, material);
	// var line2 = new THREE.Line(moon, material2);
	line.position.set(0,-Julian*scrunch,0);
	// line2.position.set(0,-Julian*scrunch,0);
	scene.add(line);
	// scene.add(line2);
}
function MarsTwo(){		//RENDERS PATH OF MARS IN ASCENDING FORMAT
	var radius = 9*rScale;
	var sat = 30;
	var time = 525600;
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: 0xED6B00 });
	var material2 = new THREE.LineBasicMaterial({color: MoonColor, linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	for(i=0;i<=time;i++){
	var j = i%(24*60);		
		cogX = distance*planetDis[3]*Math.sin((98+(i/24/60-98)*Vrot[3])*(360/365)*Math.PI/180);
		cogZ = distance*planetDis[3]*Math.cos((98+(i/24/60-98)*Vrot[3])*(360/365)*Math.PI/180);
		surfX = planetR[3]*rScale*Math.sin(j*360/24/60*Math.PI/180-Math.PI+i/24/60*(360/687)*Math.PI/180);
		surfZ = planetR[3]*rScale*Math.cos(j*360/24/60*Math.PI/180+Math.PI+i/24/60*(360/687)*Math.PI/180);
		
		geometry.vertices.push(new THREE.Vector3(
			cogX-surfX,
			(i*scrunch)/24/60-(planetR[3]*rScale*Math.sin(25*Math.PI/180))*Math.sin(j*360/24/60*Math.PI/180+Math.PI/2+i/24/60*(360/687)*Math.PI/180),
			cogZ-surfZ
		));	
	}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,-Julian*scrunch,0);
	scene.add(line);
}
function JupiterTwo(){		//RENDERS PATH OF MARS IN ASCENDING FORMAT
	var radius = 9*rScale;
	var sat = 30;
	var time = 525600;
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: 0xD8CA9D });
	var material2 = new THREE.LineBasicMaterial({color: MoonColor, linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	for(i=0;i<=time;i++){
	var j = i%(24*60);		
		cogX = distance*planetDis[4]*Math.sin((37+(i/24/60-37)*Vrot[4])*360/365*Math.PI/180);
		cogZ = distance*planetDis[4]*Math.cos((37+(i/24/60-37)*Vrot[4])*360/365*Math.PI/180);
		surfX = planetR[4]*rScale*Math.sin(j*360/24/60*Math.PI/180-Math.PI+i/24/60*(360/4332)*Math.PI/180);
		surfZ = planetR[4]*rScale*Math.cos(j*360/24/60*Math.PI/180+Math.PI+i/24/60*(360/4332)*Math.PI/180);
		
		geometry.vertices.push(new THREE.Vector3(
			cogX-surfX,
			(i*scrunch)/24/60-(planetR[4]*rScale*Math.sin(3*Math.PI/180))*Math.sin(j*360/24/60*Math.PI/180+Math.PI/2+i/24/60*(360/4332)*Math.PI/180),
			cogZ-surfZ
		));	
	}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,-Julian*scrunch,0);
	scene.add(line);
}
function SaturnTwo(){		//RENDERS PATH OF MARS IN ASCENDING FORMAT
	var radius = 9*rScale;
	var sat = 30;
	var time = 525600;
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: 0xD8CA9D });
	var material2 = new THREE.LineBasicMaterial({color: MoonColor, linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	for(i=0;i<=time;i++){
	var j = i%(24*60);		
		cogX = distance*planetDis[5]*Math.sin((118+365.24+365.24+(i/24/60-37)*Vrot[5])*360/365*Math.PI/180);	
		cogZ = distance*planetDis[5]*Math.cos((118+365.24+365.24+(i/24/60-37)*Vrot[5])*360/365*Math.PI/180);	
		surfX = planetR[5]*rScale*Math.sin(j*360/24/60*Math.PI/180-Math.PI+i/24/60*(360/10759)*Math.PI/180);
		surfZ = planetR[5]*rScale*Math.cos(j*360/24/60*Math.PI/180+Math.PI+i/24/60*(360/10759)*Math.PI/180);
		
		geometry.vertices.push(new THREE.Vector3(
			cogX-surfX,
			(i*scrunch)/24/60-(planetR[5]*rScale*Math.sin(3*Math.PI/180))*Math.sin(j*360/24/60*Math.PI/180+Math.PI/2+i/24/60*(360/10759)*Math.PI/180),
			cogZ-surfZ
		));	
	}
	var line = new THREE.Line(geometry, material);
	line.position.set(0,-Julian*scrunch,0);
	scene.add(line);
}
function One(){				//RENDERS PATH OF EARTH ASCENDING STRAIGHT FORWARD ALONG ROTATIONAL AXIS
	var radius = 9*rScale;
	var sat = 30;
	var time = 525600;
	var earth = 0x3D59AB;
	var luna = 'orange';
	var material = new THREE.LineBasicMaterial({color: EarthColor });
	var material2 = new THREE.LineBasicMaterial({color: MoonColor, linewidth: 5 });
	var geometry = new THREE.Geometry();
	var moon = new THREE.Geometry();
	var adder = (1-Math.cos(23.5*Math.PI/180))/Math.cos(23.5*Math.PI/180);
	for(i=0;i<=time;i++){
	var j = i%(24*60);		
		geometry.vertices.push(new THREE.Vector3(
			-radius*Math.sin(j*360/24/60*Math.PI/180-Math.PI),
			i*scrunch*(1)/24/60,
			-radius*Math.cos(j*360/24/60*Math.PI/180+Math.PI)
		));
		moon.vertices.push(new THREE.Vector3(
			sat*Math.sin((i)/24/60*12*Math.PI/180),
			((i*scrunch))*(1+adder)/24/60-(radius*Math.sin(5.14*Math.PI/180))*Math.sin((i)*(1+adder)*12/24/60*Math.PI/180-Math.PI/2),
			-sat*Math.cos((i)/24/60*12*Math.PI/180)
			
		));
	
	}
	var line = new THREE.Line(geometry, material);
	var line2 = new THREE.Line(moon, material2);
	var Xoffset = adj*Math.sin(23.5*Math.PI/180)/Math.cos(23.5*Math.PI/180)*scrunch;
	line.position.set(distance*Math.sin(adj*Math.PI/180),-adj*scrunch,distance*Math.cos(adj*Math.PI/180)-Xoffset);
	line2.position.set(distance*Math.sin(adj*Math.PI/180),-adj*scrunch,distance*Math.cos(adj*Math.PI/180)-Xoffset);
	line.rotation.x = 23.5*Math.PI/180;
	line2.rotation.x = 23.5*Math.PI/180;
	scene.add(line);
	scene.add(line2);
	
	//renderer.render(scene, camera);
}
function Planets(){
	Two(0);
	Two(1);
	Two(2);
	Two(3);
	Two(4);
	Two(5);
	Two(6);
	Two(7);
	Two(8);
}
function PlanetsT(){
	TwoT(0);
	TwoT(1);
	TwoT(2);
	TwoT(3);
	TwoT(4);
	TwoT(5);
	TwoT(6);
	TwoT(7);
	TwoT(8);
}