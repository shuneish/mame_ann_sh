use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Target {
    pub x: f64,
    pub y: f64,
    pub z: f64,
    pub id: u64,
    pub size: f64,
}

#[wasm_bindgen]
impl Target {
    pub fn new(x: f64, y: f64, z: f64, id: u64, size: f64) -> Target {
        Target { x, y, z, id, size }
    }

    // 色を文字列として返す（WASMでは直接Stringを扱えないため）
    pub fn get_color(&self) -> String {
        let hue = (self.id as f64 * 137.5) % 360.0;
        format!("hsl({:.0}, 70%, 50%)", hue)
    }
}

#[wasm_bindgen]
pub struct GamePhysics {
    targets: Vec<Target>,
}

#[wasm_bindgen]
impl GamePhysics {
    pub fn new() -> GamePhysics {
        GamePhysics {
            targets: Vec::new(),
        }
    }

    // 高速なターゲット生成（360度全方位）
    pub fn generate_target(&mut self, id: u64) -> Target {
        use std::f64::consts::PI;
        
        // 高速な乱数生成
        let angle = js_sys::Math::random() * 2.0 * PI;
        let distance = js_sys::Math::random() * 8.0 + 3.0;
        
        let x = angle.cos() * distance;
        let z = angle.sin() * distance;
        let y = js_sys::Math::random() * 4.0 + 1.0;
        
        let size = js_sys::Math::random() * 0.5 + 0.3;
        
        let target = Target::new(x, y, z, id, size);
        self.targets.push(target);
        target
    }

    // 高速な衝突判定
    pub fn check_collision(&self, ray_x: f64, ray_y: f64, ray_z: f64, target_id: u64) -> bool {
        for target in &self.targets {
            if target.id == target_id {
                let dx = ray_x - target.x;
                let dy = ray_y - target.y;
                let dz = ray_z - target.z;
                let distance = (dx * dx + dy * dy + dz * dz).sqrt();
                return distance <= target.size;
            }
        }
        false
    }

    // ターゲット削除
    pub fn remove_target(&mut self, target_id: u64) -> bool {
        if let Some(index) = self.targets.iter().position(|t| t.id == target_id) {
            self.targets.remove(index);
            true
        } else {
            false
        }
    }

    // 高速なターゲット更新
    pub fn update_targets(&mut self) {
        for target in &mut self.targets {
            // 高速な回転計算
            let time = js_sys::Date::now() * 0.001;
            target.x += (time * 0.1).sin() * 0.01;
            target.z += (time * 0.1).cos() * 0.01;
        }
    }

    // ターゲット数を取得
    pub fn target_count(&self) -> usize {
        self.targets.len()
    }

    // 全ターゲットを取得
    pub fn get_targets(&self) -> Vec<Target> {
        self.targets.clone()
    }
}

// 高速な数学計算関数
#[wasm_bindgen]
pub fn fast_distance(x1: f64, y1: f64, z1: f64, x2: f64, y2: f64, z2: f64) -> f64 {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dz = z2 - z1;
    (dx * dx + dy * dy + dz * dz).sqrt()
}

#[wasm_bindgen]
pub fn fast_normalize(x: f64, y: f64, z: f64) -> Vec<f64> {
    let length = (x * x + y * y + z * z).sqrt();
    if length > 0.0 {
        vec![x / length, y / length, z / length]
    } else {
        vec![0.0, 0.0, 0.0]
    }
}

// デバッグ用
#[wasm_bindgen]
pub fn log(message: &str) {
    console::log_1(&JsValue::from_str(message));
} 