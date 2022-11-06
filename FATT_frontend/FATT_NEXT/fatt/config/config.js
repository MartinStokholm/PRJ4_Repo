const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:4000/" : "https://faat.dk";
//https://localhost:7257/api/
