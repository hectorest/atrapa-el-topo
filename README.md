# Atrapa el topo 🐭

Juego de granja (whack-a-mole) en un único `index.html`: individual y multijugador con TV, ranking online (Supabase) y ranking local.

- Web: https://hectorest.github.io/atrapa-el-topo/
- `supabase.sql`: tabla del ranking (ya aplicada en el proyecto).
- Las claves de `index.html` son **públicas** por diseño (publishable key de Supabase). Nunca subas aquí la `service_role`.

## Modo Versus ⚔️ (v1.9)

Granjero contra granjero, con las reglas de siempre: cada jugador defiende su campo y gasta la energía ⚡ (se llena sola y con cada cosecha o topo atrapado) en 8 cartas, con mano de 4 que rota como en Clash Royale.

- **Ataque:** 🐭 Topo · 👑 Gigante (3 golpes) · 🐛 Plaga (marchita el mejor cultivo) · 🐦 Cuervo (se come un cultivo maduro) · ⛈️ Tormenta (cultivos lentos 10 s)
- **Defensa:** 🪤 Trampa · 🧑‍🌾 Espantapájaros · 🌱 Abono
- **Los topos y las crías son los mismos en los dos campos:** cada topo que golpeas pasa al campo del rival (túnel de 1,5 s de aviso; si lo golpeas **justo al salir** rebota más enfadado) y el que se te escapa se queda en tu campo. Tocar una cría también la manda al rival; solo las trampas la eliminan.
- Gana quien **arrase el campo del rival** (60 % de cultivos muertos) o, a los 3 minutos, quien tenga más puntos. El último minuto da energía doble.
- **Pantalla dividida** (una tablet, frente a frente): dos copias del juego en iframes, la de arriba girada 180°, que hablan por `postMessage`.
- **Online:** crea un duelo y comparte el código (o el QR); usa WebRTC, MQTT o la sala de Claude como el resto de modos de conexión.

- **3D:** los efectos del versus (túnel que tiembla, topo gigante con corona, cuervo, lluvia de la tormenta) se dibujan también en la vista 3D. En la pantalla dividida el 3D es opcional (casilla en el menú del Versus, desactivada por defecto porque son dos escenas a la vez).
