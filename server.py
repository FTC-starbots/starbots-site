#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        """Mapeia requisições de /images/ e /fonts/ para a pasta public/"""
        # Remove query strings e fragments
        path = path.split('?')[0]
        path = path.split('#')[0]
        
        # Verifica se o path começa com /images/ ou /fonts/
        if path.startswith('/images/') or path.startswith('/fonts/'):
            # Mapeia para a pasta public/
            return os.path.join(os.getcwd(), 'public', path.lstrip('/'))
        
        # Para outros paths, usa o comportamento padrão
        return super().translate_path(path)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

# Criar servidor que aceita tanto IPv4 quanto IPv6
with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Servidor rodando em http://localhost:{PORT}/")
    print(f"Servidor rodando em http://127.0.0.1:{PORT}/")
    print("Pressione Ctrl+C para parar")
    httpd.serve_forever()
