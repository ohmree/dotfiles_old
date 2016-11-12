// Version: 2016-10-28

// Obsolete function
function aclara(a) {
	var d = a.split(".");
	var id = d[0].length + "." + (a.length - d[0].length - 1);

	if (id == "42.42") {
		return aclara_f(a);
	}
	return "";
}

function aclara_p(a,p) {
	var d = a.split(".");
	var id = d[0].length + "." + (a.length - d[0].length - 1);

	if (p == "en_US-vflvtarAT") {
		return aclara_f(a);
	}
	return "";
}

function aclara_f(a) {
	a=a.split("");
	ys.Wn(a,1);
	ys.gN(a,9);
	ys.zi(a,37);
	ys.gN(a,20);
	ys.Wn(a,1);
	ys.zi(a,53);
	ys.gN(a,67);
	ys.Wn(a,2);
	ys.gN(a,80);
	return a.join("");
}

var ys = {zi:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b]=c},
gN:function(a){a.reverse()},
Wn:function(a,b){a.splice(0,b)} };

// A: NDIuNDI=
// B: ZW5fVVMtdmZsdnRhckFU
// C: MjAxNi0xMC0yOA==
// D: c3RzPTE3MDk4
// E: eXM=
