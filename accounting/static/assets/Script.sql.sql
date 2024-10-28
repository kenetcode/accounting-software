-- Naturaleza: ACTIVO
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES('1101', 'Efectivo y Equivalentes', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110101', 'Caja', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110102', 'Bancos', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('1102', 'Clientes y otras cuentas por cobrar', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110201', 'Cuentas por cobrar', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110202', 'Documentos por cobrar', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110203', 'Otras cuentas por cobrar', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('1103', 'IVA Crédito fiscal', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('1104', 'Pagos adicionales', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110401', 'Suministros de oficina', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110402', 'Alquiler de local', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('110403', 'Publicidad', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('1105', 'Deudores diversos', 'ACTIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('1201', 'Inventario de software disponible', 'ACTIVO');

-- Naturaleza: PASIVO
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('2101', 'Préstamos bancarios', 'PASIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('2102', 'Documentos por pagar', 'PASIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('2103', 'Cuentas por pagar', 'PASIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('2104', 'IVA Débito fiscal', 'PASIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('2105', 'Acreedores diversos', 'PASIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('2201', 'Préstamos bancarios a largo plazo', 'PASIVO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('2202', 'Documentos por pagar a largo plazo', 'PASIVO');

-- Naturaleza: PATRIMONIO
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('3101', 'Capital social', 'PATRIMONIO');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('3102', 'Utilidad o Pérdida del ejercicio', 'PATRIMONIO');

-- Naturaleza: CUENTAS DE RESULTADO DEUDORAS
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4101', 'Costo de venta de licencias', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4102', 'Sueldos y salarios', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4103', 'Vacaciones', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4104', 'Aguinaldo', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4105', 'Cuota patronal ISSS', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4106', 'Cuota patronal AFP', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4107', 'INCAF', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4108', 'Gastos de mantenimiento de equipos', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4109', 'Gastos de administración', 'CUENTAS DE RESULTADO DEUDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('4110', 'Gastos financieros', 'CUENTAS DE RESULTADO DEUDORAS');

-- Naturaleza: CUENTAS DE RESULTADO ACREEDORAS
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('5101', 'Ingresos por venta de licencias de software', 'CUENTAS DE RESULTADO ACREEDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('510101', 'Ingresos por venta directa de licencias', 'CUENTAS DE RESULTADO ACREEDORAS');
INSERT INTO accounting_catalogo (codigo, cuenta, naturaleza) VALUES ('510102', 'Ingresos por renovación de licencias', 'CUENTAS DE RESULTADO ACREEDORAS');