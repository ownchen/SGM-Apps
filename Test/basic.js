/*
 * JavaScript file
 */

function init() {
	// TODO Add your code here

}

function g() {

	H = 3;
	return H + H;
}

function f() {

	H = 2;
	return H + H;
}

function test() {
	$("#message").html(g());

	$("#message").html(f());
}

function closed(e) {
	$("#message").html("test");

	gm.system.closeApp(function() {
		$("#message").html("closed");
	});
}
