#version 330

uniform int toonlevels;

in Data {
    vec4 eye;
    vec2 texCoord;
    vec3 normal;
    vec3 l_dir;
}
DataIn;

out vec4 colorOut;

void main() {
    vec4 color = vec4(1,1,1,1);

    // normalize input vectors
    vec3 n = normalize(DataIn.normal);
    vec3 e = normalize(vec3(DataIn.eye));

    float intensity = max(dot(n,DataIn.l_dir), 0.0);

    if(toonlevels == 1){
		color = vec4(1.0, 0.0, 0.0, 1.0)*intensity;
	}

	if(toonlevels == 2){
		if (intensity > 0.50)
			color = vec4(0.7, 0.0, 0.0, 1.0);
		else
			color = vec4(0.3, 0.0, 0.0, 1.0);
	}

	if(toonlevels == 3){
		if (intensity > 0.70)
			color = vec4(0.8, 0.0, 0.0, 1.0);
		else if (intensity > 0.30)
			color = vec4(0.6, 0.0, 0.0, 1.0);
		else
			color = vec4(0.2, 0.0, 0.0, 1.0);
	}

	if(toonlevels == 4){
		if (intensity > 0.90)
			color = vec4(0.9, 0.0, 0.0, 1.0);
		else if (intensity > 0.70)
			color = vec4(0.7, 0.0, 0.0, 1.0);
		else if (intensity > 0.25)
			color = vec4(0.4, 0.0, 0.0, 1.0);
		else
			color = vec4(0.2, 0.0, 0.0, 1.0);
	}

	float dot = dot(e, n);

	if (dot < 0.2 && dot > -0.2)
		colorOut = vec4(0.0,0.0,0.0,1.0);
	else
		colorOut = color;
}
