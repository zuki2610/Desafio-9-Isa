/*
Creación de la base de datos:
CREATE DATABASE futscript;
*/

/*
Ejemplo de base con datos:
*/

-- Volcando estructura para tabla public.equipos
CREATE TABLE IF NOT EXISTS "equipos" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''equipos_id_seq''::regclass)',
	"name" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

-- Volcando datos para la tabla public.equipos: 4 rows
DELETE FROM "equipos";
/*!40000 ALTER TABLE "equipos" DISABLE KEYS */;
INSERT INTO "equipos" ("id", "name") VALUES
	(2, 'Colo Colo'),
	(3, 'Magallanes'),
	(4, 'Cobreloa'),
	(5, 'Cobresal');
/*!40000 ALTER TABLE "equipos" ENABLE KEYS */;

-- Volcando estructura para tabla public.posiciones
CREATE TABLE IF NOT EXISTS "posiciones" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''posiciones_id_seq''::regclass)',
	"name" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

-- Volcando datos para la tabla public.posiciones: 4 rows
DELETE FROM "posiciones";
/*!40000 ALTER TABLE "posiciones" DISABLE KEYS */;
INSERT INTO "posiciones" ("id", "name") VALUES
	(1, 'delantero'),
	(2, 'medio campista'),
	(3, 'defensa'),
	(4, 'arquero');
/*!40000 ALTER TABLE "posiciones" ENABLE KEYS */;

-- Volcando estructura para tabla public.usuarios
CREATE TABLE IF NOT EXISTS "usuarios" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''usuarios_id_seq''::regclass)',
	"email" VARCHAR NOT NULL,
	"password" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

-- Volcando datos para la tabla public.usuarios: 3 rows
DELETE FROM "usuarios";
/*!40000 ALTER TABLE "usuarios" DISABLE KEYS */;
INSERT INTO "usuarios" ("id", "email", "password") VALUES
	(1, 'admin', '$2a$10$zzNvg530gOPZnXqETYxQ8O686u.DDV.lwvwqXpMdq.JqOSXvf.34C'),
	(2, 'admin2', '$2a$10$RmH.d291nAFFGt1EgVFn9OgqrIN5rhi/.7B60UBZXRnudM8msuqx6');
	
-- Volcando estructura para tabla public.jugadores
CREATE TABLE IF NOT EXISTS "jugadores" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''jugadores_id_seq''::regclass)',
	"name" VARCHAR NOT NULL,
	"id_equipo" INTEGER NOT NULL,
	"id_posicion" INTEGER NOT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "jugadores_id_equipo_fkey" FOREIGN KEY ("id_equipo") REFERENCES "equipos" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "jugadores_id_posicion_fkey" FOREIGN KEY ("id_posicion") REFERENCES "posiciones" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Volcando datos para la tabla public.jugadores: 5 rows
DELETE FROM "jugadores";
/*!40000 ALTER TABLE "jugadores" DISABLE KEYS */;
INSERT INTO "jugadores" ("id", "name", "id_equipo", "id_posicion") VALUES
	(1, 'Iván Zamorano', 2, 1),
	(2, 'Chupete Suazo', 3, 1),
	(3, 'Claudio Bravo', 2, 4),
	(4, 'Gary Medel', 2, 3),
	(5, 'Alexis Sánchez', 2, 1);
/*!40000 ALTER TABLE "jugadores" ENABLE KEYS */;