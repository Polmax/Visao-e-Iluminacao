#version 330

uniform sampler2D t0,t1,t2,t3,t4,t5;

in Data {
    vec4 eye;
    vec2 texCoord;
    vec3 normal;
    vec3 l_dir;
} DataIn;

out vec4 colorOut;

void main() {
    vec4 color1, color2;
    float mixFactor;

    vec3 n = normalize(DataIn.normal);
    float intensity = max(0.0, dot(n,DataIn.l_dir));

    float interval = 1.0/6.0;
    if (intensity < interval) {
        color1 = texture(t0, DataIn.texCoord);
        color2 = texture(t1, DataIn.texCoord);
        mixFactor = intensity * 6;		
    }
    else if (intensity >= interval && intensity < interval*2) {
        color1 = texture(t1, DataIn.texCoord);
        color2 = texture(t2, DataIn.texCoord);
        mixFactor = (intensity - interval)* 6;		
    }
    else if (intensity >= interval*2 && intensity < interval*3) {
        color1 = texture(t2, DataIn.texCoord);
        color2 = texture(t3, DataIn.texCoord);
        mixFactor = (intensity - interval*2)* 6;		
    }
    else if (intensity >= interval*3 && intensity < interval*4) {
        color1 = texture(t3, DataIn.texCoord);
        color2 = texture(t4, DataIn.texCoord);
        mixFactor = (intensity - interval*3)* 6;		
    }
    else if (intensity >= interval*4 && intensity < interval*5) {
        color1 = texture(t4, DataIn.texCoord);
        color2 = texture(t5, DataIn.texCoord);
        mixFactor = (intensity - interval*4)* 6;		
    }
    else if (intensity >= interval*5) {
        color1 = texture(t5, DataIn.texCoord);
        color2 = vec4(1);
        mixFactor = (intensity - interval*5)* 6;		
    }

    colorOut = mix(color1, color2, mixFactor);
}
