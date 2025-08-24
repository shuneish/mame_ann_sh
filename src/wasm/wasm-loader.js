// WASMモジュールのローダー
export class WasmGamePhysics {
    constructor() {
        this.wasmModule = null;
        this.gamePhysics = null;
        this.isLoaded = false;
    }

    async load() {
        try {
            console.log('🔄 Loading WASM module...');
            
            // WASMモジュールを動的に読み込み
            console.log('📦 Attempting to import WASM module...');
            const wasmModule = await import('../wasm-pkg/shooting_game_wasm.js');
            console.log('✅ WASM module imported successfully');
            
            console.log('🔧 Initializing WASM module...');
            await wasmModule.default();
            console.log('✅ WASM module initialized');
            
            console.log('🎮 Creating GamePhysics instance...');
            this.wasmModule = wasmModule;
            this.gamePhysics = new wasmModule.GamePhysics();
            this.isLoaded = true;
            
            console.log('🚀 WASM module loaded successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to load WASM module:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            
            // より詳細なエラー情報を出力
            if (error.name === 'TypeError' && error.message.includes('import')) {
                console.error('Import error detected - checking module path');
            }
            
            console.log('⚠️ Falling back to JavaScript implementation');
            return false;
        }
    }

    // 高速なターゲット生成
    generateTarget(id) {
        if (!this.isLoaded) {
            console.warn('WASM module not loaded, using JavaScript fallback');
            return null;
        }
        
        try {
            const target = this.gamePhysics.generate_target(id);
            return {
                id: target.id,
                position: `${target.x} ${target.y} ${target.z}`,
                color: target.get_color(),
                size: target.size
            };
        } catch (error) {
            console.error('Error generating target with WASM:', error);
            return null;
        }
    }

    // 高速な衝突判定
    checkCollision(rayX, rayY, rayZ, targetId) {
        if (!this.isLoaded) return false;
        try {
            return this.gamePhysics.check_collision(rayX, rayY, rayZ, targetId);
        } catch (error) {
            console.error('Error checking collision with WASM:', error);
            return false;
        }
    }

    // ターゲット削除
    removeTarget(targetId) {
        if (!this.isLoaded) {
            console.warn('WASM not loaded, cannot remove target');
            return false;
        }
        try {
            console.log('Removing target from WASM:', targetId);
            const result = this.gamePhysics.remove_target(targetId);
            console.log('WASM remove target result:', result);
            return result;
        } catch (error) {
            console.error('Error removing target with WASM:', error);
            return false;
        }
    }

    // 高速なターゲット更新
    updateTargets() {
        if (!this.isLoaded) return;
        try {
            this.gamePhysics.update_targets();
        } catch (error) {
            console.error('Error updating targets with WASM:', error);
        }
    }

    // ターゲット数を取得
    getTargetCount() {
        if (!this.isLoaded) return 0;
        try {
            return this.gamePhysics.target_count();
        } catch (error) {
            console.error('Error getting target count with WASM:', error);
            return 0;
        }
    }

    // 高速な距離計算
    fastDistance(x1, y1, z1, x2, y2, z2) {
        if (!this.isLoaded) {
            // フォールバック: JavaScriptでの計算
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dz = z2 - z1;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        try {
            return this.wasmModule.fast_distance(x1, y1, z1, x2, y2, z2);
        } catch (error) {
            console.error('Error calculating distance with WASM:', error);
            // フォールバック
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dz = z2 - z1;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
    }

    // 高速な正規化
    fastNormalize(x, y, z) {
        if (!this.isLoaded) {
            // フォールバック: JavaScriptでの計算
            const length = Math.sqrt(x * x + y * y + z * z);
            if (length > 0) {
                return [x / length, y / length, z / length];
            }
            return [0, 0, 0];
        }
        try {
            return this.wasmModule.fast_normalize(x, y, z);
        } catch (error) {
            console.error('Error normalizing with WASM:', error);
            // フォールバック
            const length = Math.sqrt(x * x + y * y + z * z);
            if (length > 0) {
                return [x / length, y / length, z / length];
            }
            return [0, 0, 0];
        }
    }
}

// A-FrameコンポーネントとしてWASMを統合（AFRAMEが利用可能な時のみ）
if (typeof AFRAME !== 'undefined') {
    AFRAME.registerComponent('wasm-physics', {
        init: function() {
            this.wasmPhysics = new WasmGamePhysics();
            this.loadWasm();
        },

        async loadWasm() {
            const loaded = await this.wasmPhysics.load();
            if (loaded) {
                this.el.emit('wasm-loaded');
            } else {
                console.warn('WASM loading failed, falling back to JavaScript');
                this.el.emit('wasm-failed');
            }
        },

        // 高速なターゲット生成
        generateTarget(id) {
            return this.wasmPhysics.generateTarget(id);
        },

        // 高速な衝突判定
        checkCollision(rayX, rayY, rayZ, targetId) {
            return this.wasmPhysics.checkCollision(rayX, rayY, rayZ, targetId);
        },

        // ターゲット削除
        removeTarget(targetId) {
            return this.wasmPhysics.removeTarget(targetId);
        },

        // ターゲット更新
        updateTargets() {
            this.wasmPhysics.updateTargets();
        }
    });
} else {
    console.log('AFRAME not available, skipping A-Frame component registration');
} 