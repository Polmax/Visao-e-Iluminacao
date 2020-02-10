#version 330

uniform int stripes_type;

in Data {
    vec3 eye;
    vec2 texCoord;
    vec3 normal;
    vec3 l_dir;
} DataIn;

out vec4 colorOut;

void main() {
    float V;

    if (stripes_type == 0)
        V = DataIn.texCoord.y;  // horizontal stripes
    else
        V = DataIn.texCoord.x;  // vertical stripes

    float LightIntensity = max(dot(DataIn.l_dir, DataIn.normal), 0.0);

    float dp = length(vec2(dFdx(V), dFdy(V)));
    float logdp = -log2(dp * 8.0);
    float ilogdp = floor(logdp);
    float stripes = exp2(ilogdp);
    
    float sawtooth = fract((V) * stripes);
    float triangle = abs(2.0 * sawtooth - 1.0);

    // adjust line width
    float transition = logdp - ilogdp;

    // taper ends
    triangle = abs((1.0 + transition) * triangle - transition);
    
    const float edgew = 0.3;  // width of smooth step

    float edge0  = clamp(LightIntensity - edgew, 0.0, 1.0);
    float edge1  = clamp(LightIntensity, 0.0, 1.0);
    float square = 1.0 - smoothstep(edge0, edge1, triangle);
    
    colorOut = vec4(vec3(square), 1.0);
}
