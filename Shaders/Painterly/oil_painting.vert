#version 430 core

// In
in highp vec2 texCoord0;
in highp vec4 position;

// Uni
uniform highp mat4  m_pvm;

// Out
smooth out highp vec2 texCoord;


void main()
{
    texCoord = texCoord0;
    gl_Position = m_pvm * position;
}
