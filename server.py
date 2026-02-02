#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import unquote

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        """Mapeia requisições de /images/, /fonts/ e /logos/ para a pasta public/"""
        # Remove query strings e fragments
        path = path.split('?')[0]
        path = path.split('#')[0]
        
        # Decodifica URL encoding (ex: %20 para espaço)
        path = unquote(path)
        
        # Verifica se o path começa com /images/, /fonts/, /logos/ ou /teams/
        if path.startswith('/images/') or path.startswith('/fonts/') or path.startswith('/logos/') or path.startswith('/teams/'):
            # Mapeia para a pasta public/
            file_path = path.lstrip('/')
            full_path = os.path.join(os.getcwd(), 'public', file_path)
            # Normaliza o caminho para o sistema operacional
            return os.path.normpath(full_path)
        
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
