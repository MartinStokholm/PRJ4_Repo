const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "https://localhost:7257/api/" : "https://faat.dk";
//https://localhost:7257/api/
