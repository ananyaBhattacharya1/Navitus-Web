#!/usr/bin/env python3
"""Serve this static site over HTTP so includes/header.html and includes/footer.html load correctly."""
import http.server
import os
import socketserver

PORT = 8765

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving: {os.getcwd()}")
        print(f"Open:    http://127.0.0.1:{PORT}/about-us.html")
        print(f"Home:    http://127.0.0.1:{PORT}/index.html")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")
