declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext;
    constructor(options: { 
      alpha?: boolean;
      depth?: boolean;
      dpr?: number;
    });
    setSize(width: number, height: number): void;
    render(options: { scene: any; camera?: any }): void;
    dispose(): void;
  }

  export class Camera {
    constructor(gl: WebGLRenderingContext, options: { fov: number });
    position: { set: (x: number, y: number, z: number) => void };
    perspective(options: { aspect: number }): void;
  }

  export class Geometry {
    constructor(gl: WebGLRenderingContext, attributes: {
      position: { size: number; data: Float32Array };
      uv?: { size: number; data: Float32Array };
    });
  }

  export class Program {
    uniforms: Record<string, { value: any }>;
    constructor(gl: WebGLRenderingContext, options: {
      vertex: string;
      fragment: string;
      uniforms?: Record<string, { value: any }>;
      transparent?: boolean;
      depthTest?: boolean;
    });
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: {
      mode?: number;
      geometry: Geometry;
      program: Program;
    });
    position: { x: number; y: number };
    rotation: { x: number; y: number; z: number };
  }
} 