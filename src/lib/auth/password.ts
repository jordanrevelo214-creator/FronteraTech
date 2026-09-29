import crypto from "node:crypto";

/**
 * Parámetros de seguridad criptográfica PBKDF2-HMAC-SHA256
 * - Algoritmo: SHA-256 (según requerimiento de hashing 256)
 * - Iteraciones: 100,000 (estándar NIST / OWASP para mitigar ataques de fuerza bruta y GPU)
 * - Salt: 16 bytes criptográficamente seguros (32 caracteres hexadecimales)
 * - Longitud de clave derivada: 64 bytes (128 caracteres hexadecimales)
 */
const PBKDF2_DIGEST = "sha256";
const PBKDF2_ITERATIONS = 100000;
const KEY_LEN = 64;
const SALT_BYTES = 16;

/**
 * Genera un hash seguro para contraseñas utilizando PBKDF2-HMAC-SHA256 y Salt aleatorio.
 * Formato resultante: `pbkdf2:sha256:100000:<salt>:<hash>`
 */
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(SALT_BYTES).toString("hex");

    crypto.pbkdf2(
      password,
      salt,
      PBKDF2_ITERATIONS,
      KEY_LEN,
      PBKDF2_DIGEST,
      (err, derivedKey) => {
        if (err) return reject(err);
        const hash = derivedKey.toString("hex");
        resolve(`pbkdf2:${PBKDF2_DIGEST}:${PBKDF2_ITERATIONS}:${salt}:${hash}`);
      }
    );
  });
}

/**
 * Verifica una contraseña comparándola contra el hash almacenado.
 * Utiliza comparación de tiempo constante (timingSafeEqual) para prevenir ataques de canal lateral (timing attacks).
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const parts = storedHash.split(":");
      if (parts.length !== 5 || parts[0] !== "pbkdf2" || parts[1] !== PBKDF2_DIGEST) {
        // Formato no reconocido o inválido
        return resolve(false);
      }

      const iterations = parseInt(parts[2], 10);
      const salt = parts[3];
      const originalKey = Buffer.from(parts[4], "hex");

      crypto.pbkdf2(
        password,
        salt,
        iterations,
        originalKey.length,
        PBKDF2_DIGEST,
        (err, derivedKey) => {
          if (err) return resolve(false);
          // Comparación constante contra timing attacks
          if (derivedKey.length !== originalKey.length) {
            return resolve(false);
          }
          const matches = crypto.timingSafeEqual(derivedKey, originalKey);
          resolve(matches);
        }
      );
    } catch {
      resolve(false);
    }
  });
}
