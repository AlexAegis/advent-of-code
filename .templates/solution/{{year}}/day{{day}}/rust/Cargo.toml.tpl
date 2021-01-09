[package]
name = "aoc{{year}}{{day}}"
version = "1.0.0"
authors = ["AlexAegis <alexaegis@gmail.com>"]
license = "mit"
edition = "2018"

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
