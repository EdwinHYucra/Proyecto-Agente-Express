/* =========================================================
   BD MAESTRA - AGENTEEXPRESS (MariaDB 10.11.x)
   Tablas: afiliados, usuarios, fases, validaciones, locales, archivos
   ========================================================= */

CREATE DATABASE IF NOT EXISTS agenteexpress_master
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE agenteexpress_master;

/* =========================
   CATALOGOS (si ya los tienes, puedes omitirlos)
   ========================= */

CREATE TABLE IF NOT EXISTS pais (
  id_pais INT NOT NULL AUTO_INCREMENT,
  nombre_pais VARCHAR(60) NOT NULL,
  prefijo VARCHAR(7) NOT NULL,
  PRIMARY KEY (id_pais),
  UNIQUE KEY uk_pais_nombre (nombre_pais)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS departamentos (
  id_departamento INT NOT NULL AUTO_INCREMENT,
  id_pais INT NOT NULL,
  nombre_departamento VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_departamento),
  KEY idx_departamentos_pais (id_pais),
  CONSTRAINT fk_departamentos_pais
    FOREIGN KEY (id_pais) REFERENCES pais(id_pais)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS provincias (
  id_provincia INT NOT NULL AUTO_INCREMENT,
  id_departamento INT NOT NULL,
  nombre_provincia VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_provincia),
  KEY idx_provincias_departamento (id_departamento),
  CONSTRAINT fk_provincias_departamentos
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS distritos (
  id_distrito INT NOT NULL AUTO_INCREMENT,
  id_provincia INT NOT NULL,
  nombre_distrito VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_distrito),
  KEY idx_distritos_provincia (id_provincia),
  CONSTRAINT fk_distritos_provincias
    FOREIGN KEY (id_provincia) REFERENCES provincias(id_provincia)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS tipo_documento (
  id_tipo_documento INT NOT NULL AUTO_INCREMENT,
  nombre_tipo_documento VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_tipo_documento),
  UNIQUE KEY uk_tipo_documento (nombre_tipo_documento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS tipo_negocio (
  id_tipo_negocio INT NOT NULL AUTO_INCREMENT,
  nombre_tipo_negocio VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_tipo_negocio),
  UNIQUE KEY uk_tipo_negocio (nombre_tipo_negocio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   TABLA PRINCIPAL: AFILIADOS (Etapa 1)
   ========================= */

CREATE TABLE IF NOT EXISTS afiliados (
  id_afiliado BIGINT NOT NULL AUTO_INCREMENT,

  /* Datos personales */
  nombres VARCHAR(100) NOT NULL,
  apellido_paterno VARCHAR(100) NOT NULL,
  apellido_materno VARCHAR(100) NULL,
  telefono_movil VARCHAR(20) NOT NULL,

  /* Correo obligatorio para login */
  correo VARCHAR(150) NOT NULL,

  /* Identificación */
  tiene_ruc TINYINT(1) NOT NULL DEFAULT 0,
  ruc VARCHAR(11) NULL,
  dni VARCHAR(8) NULL,

  /* Negocio / rubro */
  id_tipo_negocio INT NOT NULL,

  /* Ubicación base (del registro inicial) */
  id_departamento INT NOT NULL,
  id_provincia INT NOT NULL,
  id_distrito INT NOT NULL,

  /* Estado y plan */
  plan_actual ENUM('free','pro') NOT NULL DEFAULT 'free',
  estado_general ENUM('en_proceso','pendiente_revision','observado','aprobado','activo','rechazado','suspendido')
    NOT NULL DEFAULT 'en_proceso',

  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id_afiliado),

  UNIQUE KEY uk_afiliados_correo (correo),
  UNIQUE KEY uk_afiliados_ruc (ruc),
  UNIQUE KEY uk_afiliados_dni (dni),

  KEY idx_afiliados_tipo_negocio (id_tipo_negocio),
  KEY idx_afiliados_ubigeo (id_departamento, id_provincia, id_distrito),

  CONSTRAINT fk_afiliados_tipo_negocio
    FOREIGN KEY (id_tipo_negocio) REFERENCES tipo_negocio(id_tipo_negocio),

  CONSTRAINT fk_afiliados_departamento
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento),

  CONSTRAINT fk_afiliados_provincia
    FOREIGN KEY (id_provincia) REFERENCES provincias(id_provincia),

  CONSTRAINT fk_afiliados_distrito
    FOREIGN KEY (id_distrito) REFERENCES distritos(id_distrito)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   USUARIOS DE PLATAFORMA (Login / roles globales)
   ========================= */

CREATE TABLE IF NOT EXISTS usuarios_plataforma (
  id_usuario BIGINT NOT NULL AUTO_INCREMENT,

  /* Si es dueño de un afiliado, se relaciona; admin/soporte puede ser NULL */
  id_afiliado BIGINT NULL,

  correo VARCHAR(150) NOT NULL,
  clave VARCHAR(255) NOT NULL,password_reset_tokenspassword_reset_tokens

  rol ENUM('admin_general','soporte_tecnico','dueno_afiliado') NOT NULL DEFAULT 'dueno_afiliado',
  estado ENUM('activo','bloqueado') NOT NULL DEFAULT 'activo',

  intentos_fallidos INT NOT NULL DEFAULT 0,
  bloqueado_hasta DATETIME NULL,
  ultimo_login DATETIME NULL,

  fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id_usuario),
  UNIQUE KEY uk_usuarios_plataforma_correo (correo),
  KEY idx_usuarios_plataforma_afiliado (id_afiliado),

  CONSTRAINT fk_usuarios_plataforma_afiliados
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE SET NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   PROGRESO DE REGISTRO (Fases 1,2,3)
   ========================= */

CREATE TABLE IF NOT EXISTS afiliados_progreso_registro (
  id_afiliado BIGINT NOT NULL,

  fase_actual TINYINT NOT NULL DEFAULT 1,
  completo_fase_1 TINYINT(1) NOT NULL DEFAULT 0,
  completo_fase_2 TINYINT(1) NOT NULL DEFAULT 0,
  completo_fase_3 TINYINT(1) NOT NULL DEFAULT 0,

  estado_revision ENUM('no_aplica','pendiente_revision','observado','aprobado') NOT NULL DEFAULT 'no_aplica',
  observaciones_revision TEXT NULL,

  fecha_ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id_afiliado),

  CONSTRAINT fk_progreso_afiliados
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   FASE 1: Aceptaciones (términos, datos)
   ========================= */

CREATE TABLE IF NOT EXISTS afiliados_aceptaciones (
  id_aceptacion BIGINT NOT NULL AUTO_INCREMENT,
  id_afiliado BIGINT NOT NULL,

  acepta_autenticidad_documentos TINYINT(1) NOT NULL DEFAULT 0,
  acepta_tratamiento_datos TINYINT(1) NOT NULL DEFAULT 0,

  version_terminos VARCHAR(20) NOT NULL DEFAULT '2026-01',
  fecha_aceptacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  ip VARCHAR(45) NULL,

  PRIMARY KEY (id_aceptacion),
  UNIQUE KEY uk_aceptaciones_afiliado (id_afiliado),

  CONSTRAINT fk_aceptaciones_afiliados
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   FASE 2: Validación (RUC o DNI)
   ========================= */

CREATE TABLE IF NOT EXISTS afiliados_validacion_identidad (
  id_afiliado BIGINT NOT NULL,

  tipo_validacion ENUM('DNI','RUC') NOT NULL,
  numero_documento VARCHAR(15) NOT NULL,

  /* Solo aplica si tipo_validacion = 'RUC' */
  razon_social VARCHAR(200) NULL,
  condicion_contribuyente VARCHAR(100) NULL,
  estado_contribuyente VARCHAR(100) NULL,
  regimen_tributario VARCHAR(120) NULL,

  fuente_validacion ENUM('manual','api') NOT NULL DEFAULT 'manual',
  resultado_validacion ENUM('pendiente','valido','observado','no_encontrado') NOT NULL DEFAULT 'pendiente',

  fecha_validacion DATETIME NULL,
  observacion TEXT NULL,

  PRIMARY KEY (id_afiliado),
  KEY idx_validacion_documento (tipo_validacion, numero_documento),

  CONSTRAINT fk_validacion_afiliados
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   FASE 2: Locales comerciales (1..N, plan free limita por API)
   ========================= */

CREATE TABLE IF NOT EXISTS afiliados_locales (
  id_local BIGINT NOT NULL AUTO_INCREMENT,
  id_afiliado BIGINT NOT NULL,

  direccion VARCHAR(200) NOT NULL,
  referencia VARCHAR(200) NULL,

  id_departamento INT NOT NULL,
  id_provincia INT NOT NULL,
  id_distrito INT NOT NULL,

  tipo_comercio VARCHAR(100) NULL,
  denominacion_comercial VARCHAR(200) NOT NULL,
  id_tipo_negocio INT NOT NULL,

  tiene_internet TINYINT(1) NOT NULL DEFAULT 0,

  estado ENUM('activo','inactivo') NOT NULL DEFAULT 'activo',
  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id_local),

  KEY idx_local_afiliado (id_afiliado),
  KEY idx_local_ubigeo (id_departamento, id_provincia, id_distrito),
  KEY idx_local_tipo_negocio (id_tipo_negocio),

  CONSTRAINT fk_locales_afiliados
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE CASCADE,

  CONSTRAINT fk_locales_departamento
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento),

  CONSTRAINT fk_locales_provincia
    FOREIGN KEY (id_provincia) REFERENCES provincias(id_provincia),

  CONSTRAINT fk_locales_distrito
    FOREIGN KEY (id_distrito) REFERENCES distritos(id_distrito),

  CONSTRAINT fk_locales_tipo_negocio
    FOREIGN KEY (id_tipo_negocio) REFERENCES tipo_negocio(id_tipo_negocio)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   FASE 2: Otros agentes (catálogo + relación)
   ========================= */

CREATE TABLE IF NOT EXISTS agentes_referenciados (
  id_agente_referenciado INT NOT NULL AUTO_INCREMENT,
  nombre_agente VARCHAR(150) NOT NULL,
  estado ENUM('activo','inactivo') NOT NULL DEFAULT 'activo',
  PRIMARY KEY (id_agente_referenciado),
  UNIQUE KEY uk_agente_referenciado_nombre (nombre_agente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS afiliados_agentes_referenciados (
  id_afiliado BIGINT NOT NULL,
  id_agente_referenciado INT NOT NULL,
  detalle VARCHAR(200) NULL,

  PRIMARY KEY (id_afiliado, id_agente_referenciado),

  CONSTRAINT fk_afiliados_agentes_afiliado
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE CASCADE,

  CONSTRAINT fk_afiliados_agentes_agente
    FOREIGN KEY (id_agente_referenciado) REFERENCES agentes_referenciados(id_agente_referenciado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   FASE 3: Archivos (metadatos; archivo va en disco)
   ========================= */

CREATE TABLE IF NOT EXISTS afiliados_archivos (
  id_archivo BIGINT NOT NULL AUTO_INCREMENT,
  id_afiliado BIGINT NOT NULL,
  id_local BIGINT NULL,

  tipo_archivo ENUM(
    'dni_frontal',
    'dni_posterior',
    'recibo_servicios',
    'contrato_alquiler',
    'foto_negocio',
    'captura_ubicacion'
  ) NOT NULL,

  ruta_archivo VARCHAR(500) NOT NULL,
  nombre_original VARCHAR(255) NULL,
  mime_type VARCHAR(100) NULL,
  tamano_bytes BIGINT NULL,
  hash_archivo VARCHAR(64) NULL,

  estado_revision ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  fecha_subida DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id_archivo),

  KEY idx_archivos_afiliado (id_afiliado),
  KEY idx_archivos_local (id_local),
  KEY idx_archivos_tipo (tipo_archivo),

  CONSTRAINT fk_archivos_afiliados
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE CASCADE,

  CONSTRAINT fk_archivos_locales
    FOREIGN KEY (id_local) REFERENCES afiliados_locales(id_local)
    ON DELETE SET NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/* =========================
   (Opcional por ahora) Conexión a BD del afiliado (para futuro multi-BD)
   ========================= */

CREATE TABLE IF NOT EXISTS conexiones_bd_afiliado (
  id_afiliado BIGINT NOT NULL,

  host VARCHAR(150) NOT NULL,
  puerto INT NOT NULL DEFAULT 3306,
  nombre_bd VARCHAR(100) NOT NULL,
  usuario_bd VARCHAR(100) NOT NULL,
  clave_bd_cifrada TEXT NOT NULL,

  estado ENUM('creando','lista','error') NOT NULL DEFAULT 'creando',
  fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  observacion TEXT NULL,

  PRIMARY KEY (id_afiliado),

  CONSTRAINT fk_conexiones_afiliados
    FOREIGN KEY (id_afiliado) REFERENCES afiliados(id_afiliado)
    ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE USER IF NOT EXISTS 'factura3_usuario_default'@'localhost'
IDENTIFIED BY 'Q(YS!n1Z@BHe5K]4';

GRANT SELECT, INSERT, UPDATE, DELETE,
      CREATE, ALTER, INDEX, REFERENCES
ON agenteexpress_master.* TO 'factura3_usuario_default'@'localhost';

FLUSH PRIVILEGES;

SHOW DATABASES LIKE 'agenteexpress_master';
USE agenteexpress_master;
SHOW TABLES;

SELECT * FROM migrations WHERE migration LIKE '%create_usuarios_plataforma%';
SHOW TABLES LIKE 'users';

select * from users;
select time (NOW()) as hora;

ALTER TABLE usuarios_plataforma
ADD COLUMN user_id BIGINT UNSIGNED NULL AFTER id_usuario;

ALTER TABLE usuarios_plataforma
ADD UNIQUE KEY uq_usuarios_plataforma_user_id (user_id);

ALTER TABLE usuarios_plataforma
ADD CONSTRAINT fk_usuarios_plataforma_users
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;
ALTER TABLE usuarios_plataforma
ADD CONSTRAINT fk_usuarios_plataforma_users
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;

SHOW TABLES LIKE 'users';

select * from users;
select * from usuarios_plataforma