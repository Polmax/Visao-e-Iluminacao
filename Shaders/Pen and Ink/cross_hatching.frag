#version 330

uniform sampler2D earth;

in Data {
    vec4 eye;
    vec2 texCoord;
    vec3 normal;
    vec3 l_dir;
} DataIn;

out vec4 colorOut;

void main() {
    // float lum = length(texture2D(earth, DataIn.texCoord.xy).rgb);
    vec3 n = normalize(DataIn.normal);
    float intensity = max(0.0, dot(n,DataIn.l_dir));

    colorOut = vec4(1.0, 1.0, 1.0, 1.0);

    if (intensity < 1.00) {
        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {
            colorOut = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }

    if (intensity < 0.75) {
        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {
            colorOut = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }

    if (intensity < 0.50) {
        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {
            colorOut = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }

    if (intensity < 0.3) {
        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {
            colorOut = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }
}
