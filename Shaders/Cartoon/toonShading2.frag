#version 330

uniform vec4 color;
uniform	vec4 diffuse;
uniform	vec4 ambient;
uniform float glossiness;
uniform vec4 specular;
uniform vec4 rimColor;
uniform float rimAmount;
uniform float rimThreshold;

in Data {
    vec4 eye;
    vec2 texCoord;
    vec3 normal;
    vec3 l_dir;
} DataIn;

out vec4 colorOut;

void main() {
    vec3 normal = normalize(DataIn.normal);
    float NdotL = dot(DataIn.l_dir, normal);
    vec3 viewDir = normalize(vec3(DataIn.eye));
    vec3 halfVector = normalize(DataIn.l_dir + viewDir);
    float NdotH = dot(normal, halfVector);

    float lightIntensity = smoothstep(0, 0.01, NdotL);
    vec4 light = lightIntensity * diffuse;

    float specularIntensity = pow(NdotH * lightIntensity, glossiness * glossiness);
    float specularIntensitySmooth = smoothstep(0.005, 0.01, specularIntensity);
    vec4 specular = specularIntensitySmooth * specular;

    vec4 rimDot = vec4(1 - dot(viewDir, normal));
    float rimIntensity = float(rimDot) * pow(NdotL, rimThreshold);
    rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);
    vec4 rim = rimIntensity * rimColor;

    colorOut = color * (light + ambient + specular + rim);
}
