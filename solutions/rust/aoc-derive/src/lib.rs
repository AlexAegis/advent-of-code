use proc_macro::TokenStream;

#[proc_macro_attribute]
pub fn aoc(_args: TokenStream, input: TokenStream) -> TokenStream {
	let original_fn = input.clone();

	print!("{:?}", original_fn);

	TokenStream::from(original_fn)
}
