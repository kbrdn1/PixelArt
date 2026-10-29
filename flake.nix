{
  description = "PixelArt - Development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

      in
      {
        devShells.default = pkgs.mkShell {
          name = "PixelArt";

          buildInputs = with pkgs; [
            # Node / Bun
            nodejs_24
            bun

            # Tools
            git
            curl
            jq
          ];

          shellHook = ''
            echo "🔧 PixelArt dev env loaded"
            echo "   Bun $(bun --version 2>/dev/null) | Node $(node --version 2>/dev/null)"
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';
        };
      }
    );
}
