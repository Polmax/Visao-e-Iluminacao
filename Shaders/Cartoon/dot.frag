#version 330

uniform vec3 color;
uniform float grid_step;
uniform float angulo;

in Data {
    vec2 texCoord;
    vec3 normal;
    vec3 l_dir;
} DataIn;

out vec4 colorOut;

/*
 * Retorna um valor entre 1 e 0 que indica se o pixel está dentro do círculo
 */
float circulo(vec2 pixel, vec2 centro, float raio) {
    return 1.0 - smoothstep(raio - 1.0, raio + 1.0, length(pixel - centro));
}

/*
 * Retorna a rotação da matrix para um determinado angulo
 */
mat2 rotate(float angulo) {
    return mat2(cos(angulo), -sin(angulo), sin(angulo), cos(angulo));
}

/*
 *  Calcula factor da difusa produzida pela iluminação da luz
 */
float diffuseFactor(vec3 normal, vec3 light_direction) {
    float df = dot(normalize(normal), normalize(light_direction));

    if (gl_FrontFacing) {
        df = -df;
    }

    return max(0.0, df);
}

/*
 * The main program
 */
void main() {
    // Calculata luz difusa
    float df = diffuseFactor(DataIn.normal, DataIn.l_dir);

    // Roda as coordenadas
    vec2 pos = rotate(radians(angulo)) * gl_FragCoord.xy;

    // Definir a grelha
    vec2 grid_pos = mod(pos, grid_step);

    // Calcula cor_final
    vec3 cor_final = color;
    cor_final -= circulo(grid_pos, vec2(grid_step / 2.0), 0.8 * grid_step * pow(1.0 - df, 2.0));
    cor_final = clamp(cor_final, 0.05, 1.0); // limita cor_final entre 0.05 e 1.0
    
    colorOut = vec4(cor_final, 1.0);
}
