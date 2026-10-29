# Atrapa el topo 🐭

Juego de granja (whack-a-mole) en un único `index.html`: individual, carrera (con TV opcional), versus y huerto 3D en primera persona, ranking online (Supabase) y ranking local.

- Web: https://hectorest.github.io/atrapa-el-topo/
- `supabase.sql`: tabla del ranking (ya aplicada en el proyecto).
- Las claves de `index.html` son **públicas** por diseño (publishable key de Supabase). Nunca subas aquí la `service_role`.

## Modo Huerto 3D 🧱 (v1.24)

Caza al topo **en primera persona** por un huerto vallado: pradera con árboles y flores, surcos de lechugas y zanahorias y 10 agujeros. El topo asoma por uno; ve andando hasta él y dale con el martillo antes de que se esconda. Al darle se marea y sale por otro agujero, cada vez durante menos tiempo (de 6 a 2,5 s). 90 segundos por partida y récord guardado en el dispositivo.

- **Ordenador:** ratón para mirar (o arrastrar si el navegador no deja capturar el ratón), WASD o flechas, Mayús para correr, Espacio para saltar, clic para el martillazo, Esc para pausar.
- **Móvil / tablet:** joystick a la izquierda (a tope corre), arrastra a la derecha para mirar, botón 🔨 o toca al topo directamente, ⤒ para saltar y ⏸ para pausar.
- Una **flecha naranja** indica dónde ha salido el topo y a cuántos metros; el punto de mira se pone rojo cuando está a tiro.
- **Sigue el «Estilo visual» de Ajustes:** Bloques (cubos con texturas de píxeles), 3D y AR (formas redondeadas como el tablero 3D) o 2D (dibujo plano).
- Es un plugin independiente (`HuertoPlugin`) con su propia escena Three.js: no cambia las reglas de los otros modos.

## Modo Versus ⚔️ (v1.9)

Granjero contra granjero, con las reglas de siempre: cada jugador defiende su campo y gasta la energía ⚡ (se llena sola y con cada cosecha o topo atrapado) en 8 cartas, con mano de 4 que rota como en Clash Royale.

- **Ataque:** 🐭 Topo · 👑 Gigante (3 golpes) · 🐛 Plaga (marchita el mejor cultivo) · 🐦 Cuervo (se come un cultivo maduro) · ⛈️ Tormenta (cultivos lentos 10 s)
- **Defensa:** 🪤 Trampa · 🧑‍🌾 Espantapájaros · 🌱 Abono
- **Los topos y las crías son los mismos en los dos campos:** cada topo que golpeas pasa al campo del rival (túnel de 1,5 s de aviso; si lo golpeas **justo al salir** rebota más enfadado) y el que se te escapa se queda en tu campo. Tocar una cría también la manda al rival; solo las trampas la eliminan.
- Gana quien **arrase el campo del rival** (60 % de cultivos muertos) o, a los 3 minutos, quien tenga más puntos. El último minuto da energía doble.
- **Pantalla dividida** (una tablet, frente a frente): dos copias del juego en iframes, la de arriba girada 180°, que hablan por `postMessage`.
- **Online:** crea un duelo y comparte el código (o el QR); usa WebRTC, MQTT o la sala de Claude como el resto de modos de conexión.

- **3D:** los efectos del versus (túnel que tiembla, topo gigante con corona, cuervo, lluvia de la tormenta) se dibujan también en la vista 3D. En la pantalla dividida el 3D es opcional (casilla en el menú del Versus, desactivada por defecto porque son dos escenas a la vez).

## TV de casa (Carrera)
Abre **`…/atrapa-el-topo/tv`** en el navegador de la TV (por ejemplo Silk en Fire TV; guárdala como favorito o página de inicio).
La TV queda esperando con un código fijo que recuerda. En el móvil: *Jugar → Carrera → Unirme* y escribe el código **una vez**;
después aparece el botón **📺 Mi TV** para entrar de jugador con un toque, y el móvil puede pulsar **▶ Empezar la carrera para todos**.
