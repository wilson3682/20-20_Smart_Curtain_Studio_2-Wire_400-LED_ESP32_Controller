# ✨ 20×20 Smart Curtain Studio (2-Wire 400-LED ESP32 Controller)

**Thanks to Sp0Q1**
https://github.com/Sp0Q1/action-smart-led-curtain-2wire

A high-performance, zero-flicker **ESP32 firmware and studio web interface** designed to control commercial **20×20 (400-LED) 2-Wire Smart Curtain Lights** over Wi-Fi.

Unlike standard 3-wire addressable LEDs, these 2-wire fairy curtains send both power and data over only **two wires (`LED+` and `LED-`)** by modulating the ground return path. This firmware uses a dedicated dual-core architecture on the ESP32 to deliver **flicker-free 2D animations, custom palettes, 60 presets, playlists, animated 20×20 GIF playback, infrared remote support, and sunrise/sunset scheduling**.

---

## 🚀 Quick Web Installation (No Coding Required)

You can flash this firmware directly to your ESP32 from **Google Chrome** or **Microsoft Edge** using our Web Installer:

1. 👉 **[Click Here to Launch Web Serial Installer](https://wilson3682.github.io/20-20_Smart_Curtain_Studio_2-Wire_400-LED_ESP32_Controller/install.html)**
2. Plug your **ESP32** into your computer using a data-capable USB cable.
3. Click **⚡ Install Curtain Studio Firmware**, select your ESP32's COM/Serial port, and click **Install**.
   *(Tip: If your ESP32 stays on "Connecting...", hold down the **BOOT** button on your ESP32 for 2 seconds while clicking Install).*
   
**OTA Update** * 📦 **[Download Latest `firmware.bin` (For Wireless OTA Update)](firmware/firmware.bin)**

---

## 🔌 Hardware Wiring

You can wire your ESP32 in **two ways**: either by building a simple standalone MOSFET circuit or by reusing the MOSFET on the curtain's original USB controller board.

### Option A: Standalone MOSFET Circuit (Recommended)
Use a true **$3.3\text{V}$ Logic-Level N-Channel MOSFET** such as **`AO3400`** (SMD), **`AO3402`**, **`IRLZ34N`** (TO-220), or **`RFP30N06LE`** (TO-220).

```text
                  +5V DC Power Supply (1A - 3A)
                 (+)                         (-)
                  │                           │
        ┌─────────┼─────────┬─────────────────┤
        │         │        (+)                │
        │         │      470µF - 1000µF       │
        │         │      Capacitor (C1)       │
        │         │        (-)                │
        │         │         └─────────────────┤
        ▼         ▼                           │
   [ESP32 VIN]  [Curtain LED+]                │
   (or 5V Pin)    │                           │
                  ▼                           │
            (400 Curtain                      │
               LEDs)                          │
                  │                           │
                [Curtain LED-]                │
                  │                           │
                  ▼                           │
               (DRAIN)                        │
                ┌───────────┐                 │
   [GPIO 4]─────┤  GATE     │  N-Channel Logic MOSFET
    via R7      │           │  (AO3400 / AO3402 / IRLZ34N)
  (200Ω-220Ω)   │  SOURCE   │                 │
         │      └─────┬─────┘                 │
         │            │                       │
        ┌┴─┐          │                       │
        │R8│ 100kΩ    │                       │
        └┬─┘          │                       │
         │            │                       │
   [ESP32 GND]────────┴───────────────────────┴──── Common GND
```

### Option B: Reusing the Original USB Controller Board (`KR-040-R0`)
1. Locate the 3-pin SMD MOSFET marked **`S10`** (`AO3400`) on the back of the original USB controller PCB near the `LED-` pad.
2. Disconnect/cut the trace going from the original controller IC (`R7`) to the MOSFET **Gate** (bottom-left pin of `S10`).
3. Connect **ESP32 `GPIO 4`** through a **`200 Ω` resistor** to the MOSFET **Gate**.
4. Connect **ESP32 `GND`** to the original board's **`GND`** and power both from `+5V`.

---

## 📶 First-Time Wi-Fi Setup

### Step 1: Connect to the Direct Access Point (AP)
1. Power on the ESP32.
2. On your phone or computer, connect to the Wi-Fi network:
   * **SSID:** `Curtain-Lights`
   * **Password:** `12345678`
3. Open your web browser and go to: **`http://192.168.4.1`**

### Step 2: Connect to Your Home Wi-Fi Network
1. Click the **⚙️ CONFIG** button in the top navigation bar and select the **📶 Wi-Fi** tab.
2. Click **🔍 Scan Nearby Wi-Fi Networks**, click your home Wi-Fi network from the list, and enter your Wi-Fi password.
3. Click **💾 Save & Connect Wi-Fi**.
4. The controller operates in **Dual Mode (AP + Home Wi-Fi)**:
   * Once connected, the top-left badge on the page will display **`Home IP: 192.168.x.x`**.
   * You can now access the controller from any device on your home network using that Home IP address!

---

## 🎨 Studio Interface & Features Guide

### 1. Top Navigation Bar
* **⚡ POWER:** Turns the curtain ON/OFF (and switches your external power relay if configured).
* **👁️ PEEK:** Opens a real-time **20×20 Live Matrix Monitor** streamed over WebSockets so you can see exactly what is playing on the curtain from anywhere.
* **ℹ️ INFO:** Displays firmware version, ESP32 chip stats, Home/AP IP addresses, MAC address, uptime, **live GPIO Pin Map** (showing used pins and free safe pins), **🔄 Restart Device**, and **🚀 Wireless OTA Firmware Update (`.bin`)**.
* **⚙️ CONFIG:** Opens the 4-tab configuration center (*Pins & HW*, *Wi-Fi*, *Time & Schedules*, and *Backup*).
* **🖥️ PC MODE / PHONE VIEW:** Switches between the 3-column desktop studio layout and a single-column mobile layout.
* **💾 Save Settings & ☀️ Brightness Slider:** Adjusts master brightness (`1–30`) in real time and saves your startup state to flash.

### 2. Column 1: Colors, GIF Studio & Theme Palettes
* **Live Color Wheel & Swatches:** Drag smoothly across the color wheel for zero-flicker live solid color previews, or click any of the 12 calibrated color swatches.
* **🎞️ Open 20×20 GIF Studio & Explorer:**
  * Pick a single `.gif` file or load an entire folder of 20×20 `.gif` files from your computer.
  * Preview animations in the browser and click any GIF to upload and play it on the curtain.
  * Uploaded GIFs are saved to internal flash as **`/wclumiere.gif`** (always overwriting the single slot so storage never fills up) and automatically reload after a power-off!
* **24 Theme Palettes + 🎨 In-Browser Palette Studio:**
  * Choose from 20 built-in color gradients or click **In-Browser Palette Studio** to design your own 5-stop custom gradients in slots `20–23`.
  * Includes an independent **Palette Cycle Time (`3s–120s`)** slider, **Palettes Auto (ON/OFF)**, and **Linear / Random** mode.

### 3. Column 2: 55 2D Matrix Effects
* Search and select from **55 procedural 2D shaders** (*Kaleidoscopes, Bouncing Balloons, Fire 2012, Matrix Rain, Starfield Zoom, Aurora Borealis, Metaballs, DNA Helix, Black Hole, Arcade Sprites*, and more).
* Selecting an effect automatically resets the **Speed**, **Intensity / FX**, and **Effect Size** sliders to that effect's tuned default values.
* Includes an independent **Effect Cycle Time (`3s–120s`)** slider, **Effects Auto (ON/OFF)**, and **Linear / Random** mode.

### 4. Column 3: 60 Presets & Multi-Playlist Studio
* Create up to **60 custom presets** stored directly in the ESP32's flash memory.
* Click the **`▶` arrow** on any preset card to view or copy its raw JSON API payload.
* Click **📑 Multi-Playlist Studio** to build custom playlists with individual durations, repeat counts (`Infinite` or `1–99` loops), Linear/Shuffle order, and end-of-playlist actions.

---

## 🎞️ Using the External HTML GIF Connector (`wled_html_connector_22.html`)

For advanced GIF management, LaMetric store browsing, automatic resizing of any image/GIF to 20×20, and live **Pixel Paint**, open the included **`wled_html_connector_22.html`** file on your computer:

1. Double-click **`wled_html_connector_22.html`** to open it in Chrome or Edge (keep `gifs.js` in the same folder).
2. Enter your curtain controller's IP address in the **IP** box at the top and click **Reconnect**.
3. Use any of the studio tabs:
   * **🖼️ Big Explorer:** Load a local folder of 2,000+ GIFs with pagination and search.
   * **📑 GIF Playlist:** Queue multiple GIFs from your computer to cycle automatically.
   * **🌐 LaMetric Store:** Browse and play community 20×20 icons by category or ID.
   * **🎬 Quick Studio:** Drag-and-drop any `.gif` or `.png`—it automatically resizes to `20×20` and streams to `/wclumiere.gif`.
   * **🎨 Pixel Paint:** Draw pixel art live on the 20×20 canvas and see it appear on your curtain in real time.

---

## ⚙️ Hardware Pins, IR Remote & Time Schedules (`CONFIG`)

* **🔌 Pins & HW Tab:**
  * Change the **LED Output GPIO Pin** (default `GPIO 4`).
  * Enable the **IR Remote Receiver** on any free input pin (e.g., `GPIO 15` or `GPIO 16`) with support for *Universal Auto-Detect*, *24-Key*, *44-Key*, *40-Key*, and *21-Key* NEC remotes.
  * Configure an external **Power Relay GPIO Pin** (*Disabled*, *Active LOW*, or *Active HIGH*).
* **⏰ Time & Sched Tab:**
  * Select your **World Time Zone**, enable **Daylight Saving Time (+1h DST)**, choose **12-Hour (AM/PM)** or **24-Hour** clock display, and click **🔄 Sync Time Now**.
  * Enter your **Latitude & Longitude** (or click **📍 Auto**) to calculate daily **Sunrise 🌅** and **Sunset 🌇** times.
  * Configure up to **8 Daily Timers** to turn power ON/OFF, launch a specific Preset (`1–60`), or start Preset/Effect Autoplay at an exact time, at Sunrise, or at Sunset.
* **💾 Backup Tab:**
  * Download all settings, pins, schedules, and 60 presets to a single **`curtain_studio_backup.json`** file, or restore from a backup file anytime.
