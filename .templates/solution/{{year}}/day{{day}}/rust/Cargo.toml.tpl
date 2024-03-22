[package]
name = "aoc{{year}}{{day}}"
version = "1.0.0"
authors = ["AlexAegis <alexaegis@pm.me>"]
license = "mit"
edition = "2021"

[lib]
name = "aoc{{year}}{{day}}"
path = "./src/lib.rs"

[dependencies]
aoclib = { path = "../../lib" }

[dev-dependencies]
criterion = "*"

[[bench]]
name = "bench"
harness = false
