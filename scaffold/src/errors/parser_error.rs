use std::convert::From;
use std::string::String;

#[derive(Debug)]
pub struct ParserError {
	pub message: String,
}

impl From<std::ffi::OsString> for ParserError {
	fn from(_: std::ffi::OsString) -> ParserError {
		ParserError {
			message: "Invalid data type".to_string(),
		}
	}
}

impl From<std::num::ParseIntError> for ParserError {
	fn from(_: std::num::ParseIntError) -> ParserError {
		ParserError {
			message: "Invalid data type".to_string(),
		}
	}
}
