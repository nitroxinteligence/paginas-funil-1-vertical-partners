<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/lp-funil/V.svg" type="image/svg+xml" />
    <title>Vertical Partners - Ecossistema RAA com IA para Empresas</title>
    <script type="module" crossorigin src="/lp-funil/assets/index-d9759712.js"></script>
    <link rel="stylesheet" href="/lp-funil/assets/index-81a3c8df.css">
  </head>
  <body>
    <div id="root"></div>
    <script>
      (function () {
        var hintText = "Aumente o volume";
        var matchText = "ETAPA DESBLOQUEAD";

        var createHint = function () {
          var wrapper = document.createElement("div");
          wrapper.setAttribute("data-volume-hint", "true");
          wrapper.style.display = "flex";
          wrapper.style.alignItems = "center";
          wrapper.style.justifyContent = "center";
          wrapper.style.gap = "8px";
          wrapper.style.marginTop = "8px";
          wrapper.style.color = "#d1d5db";
          wrapper.style.fontSize = "0.95rem";
          wrapper.style.fontWeight = "500";

          var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          icon.setAttribute("viewBox", "0 0 24 24");
          icon.setAttribute("width", "18");
          icon.setAttribute("height", "18");
          icon.setAttribute("aria-hidden", "true");
          icon.style.fill = "none";
          icon.style.stroke = "currentColor";
          icon.style.strokeWidth = "2";
          icon.style.strokeLinecap = "round";
          icon.style.strokeLinejoin = "round";

          var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path1.setAttribute("d", "M11 5L6 9H3v6h3l5 4z");
          var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path2.setAttribute("d", "M15.54 8.46a5 5 0 010 7.07");
          var path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path3.setAttribute("d", "M19.07 4.93a10 10 0 010 14.14");

          icon.appendChild(path1);
          icon.appendChild(path2);
          icon.appendChild(path3);

          var text = document.createElement("span");
          text.textContent = hintText;

          wrapper.appendChild(icon);
          wrapper.appendChild(text);

          return wrapper;
        };

        var maybeInsert = function (heading) {
          if (!heading || !heading.parentElement) return;
          if (heading.parentElement.querySelector('[data-volume-hint="true"]')) return;
          heading.insertAdjacentElement("afterend", createHint());
        };

        var scan = function () {
          var headings = document.querySelectorAll("h1,h2,h3");
          headings.forEach(function (heading) {
            var text = (heading.textContent || "").toUpperCase();
            if (text.indexOf(matchText) !== -1) {
              maybeInsert(heading);
            }
          });
        };

        var observer = new MutationObserver(function () {
          scan();
        });

        window.addEventListener("load", scan);
        setTimeout(scan, 800);

        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      })();
    </script>
    <script>
      (function () {
        var modalAudioNeedle = "audio-final-lp-funil-1.mp3";
        var modalTextNeedles = [
          "agora olha o seu whatsapp",
          "brincadeira está apenas começando",
        ];

        window.stopAllAudio = function () {
          var audios = document.querySelectorAll("audio");
          audios.forEach(function (audio) {
            try {
              var src = audio.getAttribute("src") || "";
              if (src.indexOf(modalAudioNeedle) !== -1) {
                audio.muted = true;
                audio.volume = 0;
                audio.autoplay = false;
                audio.pause();
                audio.remove();
              }
            } catch (error) {}
          });
        };

        window.blockAudioPlay = function () {
          if (window.__vpModalAudioBlocked) return;
          window.__vpModalAudioBlocked = true;

          var originalPlay = HTMLMediaElement.prototype.play;
          HTMLMediaElement.prototype.play = function () {
            try {
              var src = this.getAttribute("src") || "";
              if (src.indexOf(modalAudioNeedle) !== -1) {
                this.muted = true;
                this.volume = 0;
                this.autoplay = false;
                return Promise.resolve();
              }
            } catch (error) {}
            return originalPlay.apply(this, arguments);
          };
        };

        var findOverlay = function (node) {
          var current = node;
          while (current && current !== document.body) {
            var className = current.className || "";
            if (
              className.indexOf("fixed") !== -1 &&
              className.indexOf("inset-0") !== -1 &&
              className.indexOf("z-50") !== -1
            ) {
              return current;
            }
            current = current.parentElement;
          }
          return null;
        };

        var hideModal = function (node) {
          var modal =
            node.closest('[role="dialog"]') ||
            node.closest('[aria-modal="true"]') ||
            findOverlay(node);
          if (modal) {
            modal.style.opacity = "0";
            modal.style.pointerEvents = "none";
            modal.style.visibility = "hidden";
            modal.style.display = "none";
          }
          var overlay = findOverlay(node);
          if (overlay) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            overlay.style.visibility = "hidden";
            overlay.style.display = "none";
          }
          if (document.body && document.body.classList) {
            document.body.classList.remove("overflow-hidden");
          }
        };

        var scan = function () {
          var modalAudio = document.querySelector(
            'audio[src*="' + modalAudioNeedle + '"]'
          );
          if (modalAudio) {
            hideModal(modalAudio);
            window.stopAllAudio();
          }

          var dialogs = document.querySelectorAll(
            '[role="dialog"],[aria-modal="true"]'
          );
          dialogs.forEach(function (dialog) {
            var textLower = (dialog.textContent || "").toLowerCase();
            var matches = modalTextNeedles.some(function (needle) {
              return textLower.indexOf(needle) !== -1;
            });
            if (matches) {
              hideModal(dialog);
            }
          });

          var overlays = document.querySelectorAll(
            'div[class*="fixed"][class*="inset-0"][class*="z-50"]'
          );
          overlays.forEach(function (overlay) {
            var overlayText = (overlay.textContent || "").toLowerCase();
            var hasAudio = overlay.querySelector(
              'audio[src*="' + modalAudioNeedle + '"]'
            );
            var matches = modalTextNeedles.some(function (needle) {
              return overlayText.indexOf(needle) !== -1;
            });
            if (matches || hasAudio) {
              hideModal(overlay);
            }
          });
        };

        var observer = new MutationObserver(function () {
          scan();
        });

        window.blockAudioPlay();
        window.addEventListener("load", scan);
        setTimeout(scan, 800);

        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      })();
    </script>
    <script>
      (function () {
        var headingMatch = "Veja como foi e como será";
        var cardText =
          "Nossa Agente IA te enviou uma mensagem agora mesmo no WhatsApp.";

        var adjustSpacing = function () {
          var headings = document.querySelectorAll("h1,h2,h3");
          headings.forEach(function (heading) {
            var text = (heading.textContent || "").trim();
            if (text.indexOf(headingMatch) !== -1) {
              heading.style.marginBottom = "1.25rem";
              if (heading.parentElement) {
                heading.parentElement.style.marginTop = "6rem";
              }
              var timeline = heading.nextElementSibling;
              if (timeline) {
                timeline.style.marginTop = "0.25rem";
              }
            }
          });
        };

        var tweakTimeline = function () {
          var heading = null;
          document.querySelectorAll("h1,h2,h3").forEach(function (node) {
            var text = (node.textContent || "").trim();
            if (!heading && text.indexOf(headingMatch) !== -1) {
              heading = node;
            }
          });

          var root =
            heading && heading.parentElement
              ? heading.parentElement.querySelector('div[class*="max-w-5xl"]')
              : null;

          if (!root) return;

          var items = root.querySelectorAll("div");
          items.forEach(function (item) {
            var className = item.className || "";
            if (
              className.indexOf("flex") !== -1 &&
              className.indexOf("justify-center") !== -1 &&
              className.indexOf("pt-20") !== -1
            ) {
              item.style.paddingTop = "3.5rem";
            }

            if (className.indexOf("sticky") !== -1) {
              item.style.top = "6rem";
            }
          });

          var line = null;
          items.forEach(function (item) {
            var className = item.className || "";
            if (
              className.indexOf("w-[2px]") !== -1 &&
              className.indexOf("bg-[linear-gradient") !== -1
            ) {
              line = item;
            }
          });

          if (line) {
            line.style.height = root.offsetHeight + "px";
          }
        };

        var createWhatsappButton = function () {
          var message =
            "Olá! Vim pelo site da Vertical Partners e estou interessado nas soluções.";
          var whatsappUrl =
            "https://wa.me/5548996940931?text=" +
            encodeURIComponent(message);
          var wrapper = document.createElement("div");
          wrapper.setAttribute("data-whatsapp-cta", "true");
          wrapper.style.marginTop = "2.5rem";
          wrapper.style.display = "flex";
          wrapper.style.justifyContent = "center";

          var button = document.createElement("a");
          button.href = whatsappUrl;
          button.target = "_blank";
          button.rel = "noopener noreferrer";
          button.style.display = "inline-flex";
          button.style.alignItems = "center";
          button.style.gap = "12px";
          button.style.padding = "18px 28px";
          button.style.borderRadius = "999px";
          button.style.border = "none";
          button.style.cursor = "pointer";
          button.style.background = "#22c55e";
          button.style.color = "#0b0b0b";
          button.style.fontSize = "1.05rem";
          button.style.fontWeight = "600";
          button.style.boxShadow = "0 14px 30px rgba(34, 197, 94, 0.35)";
          button.style.textDecoration = "none";

          var icon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          icon.setAttribute("viewBox", "0 0 24 24");
          icon.setAttribute("width", "20");
          icon.setAttribute("height", "20");
          icon.setAttribute("aria-hidden", "true");
          icon.style.fill = "currentColor";

          var path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path.setAttribute(
            "d",
            "M12.04 2.01c-5.51 0-9.99 4.48-9.99 9.99 0 1.77.46 3.5 1.33 5.04L2 22l5.13-1.35a9.94 9.94 0 004.91 1.31h.01c5.51 0 9.99-4.48 9.99-9.99S17.56 2.01 12.04 2.01zm5.83 14.34c-.25.7-1.45 1.35-2 1.43-.52.08-1.19.12-1.92-.12-.44-.14-1-.32-1.72-.64-3.03-1.31-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.12 0-1.48.77-2.21 1.04-2.51.27-.3.59-.38.79-.38.2 0 .4 0 .58.01.19.01.44-.07.69.53.25.6.85 2.1.92 2.25.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.3.31-.13.61.17.3.76 1.24 1.64 2.01 1.13.99 2.08 1.3 2.38 1.45.3.15.47.13.65-.08.18-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.7.8 1.99.94.29.14.49.21.56.33.07.12.07.7-.18 1.4z"
          );
          icon.appendChild(path);

          var text = document.createElement("span");
          text.textContent = "Quero meu ecossistema agora";

          button.appendChild(icon);
          button.appendChild(text);
          wrapper.appendChild(button);
          return wrapper;
        };

        var replaceCard = function () {
          var match = null;
          document.querySelectorAll("p,div,span").forEach(function (node) {
            if (match) return;
            var text = (node.textContent || "").trim();
            if (text === cardText) {
              match = node;
            }
          });

          if (!match) return;

          var container = match.closest("div");
          if (!container) return;

          if (container.getAttribute("data-replaced") === "true") {
            return;
          }

          container.setAttribute("data-replaced", "true");
          container.style.display = "none";

          var buttonWrapper = createWhatsappButton();
          if (container.parentElement) {
            container.parentElement.insertBefore(
              buttonWrapper,
              container.nextSibling
            );
          }
        };

        var buildFooter = function () {
          var wrapper = document.createElement("div");
          wrapper.setAttribute("data-vp-footer-wrapper", "true");
          wrapper.style.maxWidth = "1120px";
          wrapper.style.margin = "0 auto";
          wrapper.style.padding = "0 24px 64px";

          var footer = document.createElement("footer");
          footer.setAttribute("data-vp-footer", "true");
          footer.style.marginTop = "5rem";
          footer.style.width = "100%";
          footer.style.borderRadius = "50px";
          footer.style.border = "1px solid rgba(71, 85, 105, 0.5)";
          footer.style.padding = "clamp(32px, 5vw, 80px)";
          footer.style.color = "rgba(203, 213, 225, 0.85)";
          footer.style.background = "transparent";

          var row = document.createElement("div");
          row.style.display = "flex";
          row.style.flexWrap = "wrap";
          row.style.gap = "16px";
          row.style.alignItems = "center";
          row.style.justifyContent = "space-between";

          var brand = document.createElement("div");
          brand.style.display = "flex";
          brand.style.flexDirection = "column";
          brand.style.gap = "4px";

          var title = document.createElement("p");
          title.textContent = "Vertical Partners";
          title.style.fontSize = "16px";
          title.style.fontWeight = "600";
          title.style.color = "#e2e8f0";

          var subtitle = document.createElement("p");
          subtitle.textContent = "IA aplicada para acelerar crescimento e eficiência.";
          subtitle.style.fontSize = "12px";
          subtitle.style.color = "rgba(203, 213, 225, 0.75)";

          brand.appendChild(title);
          brand.appendChild(subtitle);

          var links = document.createElement("div");
          links.style.display = "flex";
          links.style.flexWrap = "wrap";
          links.style.gap = "12px";
          links.style.fontSize = "12px";
          links.style.color = "rgba(203, 213, 225, 0.75)";

          var terms = document.createElement("a");
          terms.href = "/termos-de-uso";
          terms.textContent = "Termos";
          terms.style.padding = "4px 12px";
          terms.style.border = "1px solid rgba(203, 213, 225, 0.4)";
          terms.style.borderRadius = "999px";
          terms.style.textDecoration = "none";
          terms.style.color = "inherit";

          var privacy = document.createElement("a");
          privacy.href = "/politica-de-privacidade";
          privacy.textContent = "Privacidade";
          privacy.style.padding = "4px 12px";
          privacy.style.border = "1px solid rgba(203, 213, 225, 0.4)";
          privacy.style.borderRadius = "999px";
          privacy.style.textDecoration = "none";
          privacy.style.color = "inherit";

          var contact = document.createElement("span");
          contact.textContent = "Contato";
          contact.style.padding = "4px 12px";
          contact.style.border = "1px solid rgba(203, 213, 225, 0.4)";
          contact.style.borderRadius = "999px";

          links.appendChild(terms);
          links.appendChild(privacy);
          links.appendChild(contact);

          row.appendChild(brand);
          row.appendChild(links);

          var legal = document.createElement("div");
          legal.style.marginTop = "16px";
          legal.style.fontSize = "12px";
          legal.style.color = "rgba(203, 213, 225, 0.7)";
          legal.textContent =
            "© " +
            new Date().getFullYear() +
            " Vertical Partners. Todos os direitos reservados.";

          footer.appendChild(row);
          footer.appendChild(legal);
          wrapper.appendChild(footer);
          return wrapper;
        };

        var replaceFooter = function () {
          var footers = document.querySelectorAll(
            "footer,[data-vp-footer-wrapper]"
          );
          footers.forEach(function (footer) {
            footer.remove();
          });
        };

        var centerInstagramModal = function () {
          var inputs = document.querySelectorAll('input[placeholder*="@"]');
          var targetInput = null;
          inputs.forEach(function (input) {
            if (!targetInput) {
              targetInput = input;
            }
          });

          if (!targetInput) return;

          var container = targetInput.closest("div");
          while (container && container !== document.body) {
            var className = container.className || "";
            if (
              className.indexOf("max-w-lg") !== -1 ||
              className.indexOf("rounded-3xl") !== -1
            ) {
              break;
            }
            container = container.parentElement;
          }

          if (!container || container.getAttribute("data-centered") === "true") {
            return;
          }

          container.style.marginLeft = "auto";
          container.style.marginRight = "auto";
          container.style.alignSelf = "center";
          container.setAttribute("data-centered", "true");
        };

        var run = function () {
          adjustSpacing();
          tweakTimeline();
          replaceCard();
          replaceFooter();
          centerInstagramModal();
          if (window.stopAllAudio) {
            window.stopAllAudio();
          }
          if (window.blockAudioPlay) {
            window.blockAudioPlay();
          }
        };

        var observer = new MutationObserver(function () {
          run();
        });

        window.addEventListener("load", run);
        window.addEventListener("resize", tweakTimeline);
        setTimeout(run, 800);

        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      })();
    </script>
    <script>
      (function () {
        var leadIdKey = "vp-lead-id";
        var leadEndpoint = "/api/leads-funil-1";

        var sendLead = function (payload) {
          if (!payload) return;
          var leadName = String(payload.lead_name || "").trim();
          var rawWhatsapp = payload.whatsapp || "";
          var digits = String(rawWhatsapp).replace(/\D/g, "");
          if (leadName.length < 2 || digits.length < 10) {
            return;
          }
          var body = Object.assign({}, payload, { lead_name: leadName });
          var existingLeadId = localStorage.getItem(leadIdKey);
          if (existingLeadId && !body.leadId) {
            body.leadId = existingLeadId;
          }

          return fetch(leadEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then(function (response) {
              if (!response.ok) return null;
              return response.json();
            })
            .then(function (data) {
              if (data && data.id) {
                localStorage.setItem(leadIdKey, data.id);
              }
            })
            .catch(function () {});
        };

        var attachForm = function () {
          var form = document.getElementById("lead-form");
          if (!form || form.getAttribute("data-lead-bound") === "true") {
            return;
          }
          form.setAttribute("data-lead-bound", "true");

          var nameInput =
            form.querySelector('input[placeholder="Nome"]') ||
            form.querySelector('input[name="name"]');
          var whatsappInput =
            form.querySelector('input[placeholder*="WhatsApp"]') ||
            form.querySelector('input[name="whatsapp"]');

          var debounceTimer = null;
          var lastPayload = "";
          var scheduleSend = function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function () {
              var nameValue = nameInput ? nameInput.value.trim() : "";
              var whatsappValue = whatsappInput ? whatsappInput.value : "";
              var digits = String(whatsappValue).replace(/\D/g, "");
              if (nameValue.length < 2 || digits.length < 10) {
                return;
              }
              var payloadKey = nameValue + "|" + digits;
              if (payloadKey === lastPayload) {
                return;
              }
              lastPayload = payloadKey;
              sendLead({
                lead_name: nameValue,
                whatsapp: whatsappValue,
                source: "lp-funil",
              });
            }, 600);
          };

          if (nameInput) {
            nameInput.addEventListener("input", scheduleSend);
          }
          if (whatsappInput) {
            whatsappInput.addEventListener("input", scheduleSend);
          }

          form.addEventListener("submit", function () {
            var nameValue = nameInput ? nameInput.value.trim() : "";
            var whatsappValue = whatsappInput ? whatsappInput.value : "";
            sendLead({
              lead_name: nameValue,
              whatsapp: whatsappValue,
              source: "lp-funil",
            });
          });
        };

        var patchFetch = function () {
          if (window.__vpLeadFetchPatched) return;
          window.__vpLeadFetchPatched = true;

          var originalFetch = window.fetch;
          window.fetch = function (input, init) {
            var url = "";
            try {
              url = typeof input === "string" ? input : input.url || "";
              if (url.indexOf("/api/generate-diagnostic") !== -1 && init && init.body) {
                var parsed = JSON.parse(init.body);
                var leadId = localStorage.getItem(leadIdKey);
                if (leadId && !parsed.leadId) {
                  parsed.leadId = leadId;
                  init.body = JSON.stringify(parsed);
                }
              }
            } catch (error) {}
            var responsePromise = originalFetch.apply(this, arguments);
            if (url.indexOf("/api/generate-diagnostic") !== -1) {
              return responsePromise.then(function (response) {
                try {
                  response
                    .clone()
                    .json()
                    .then(function (data) {
                      if (data && data.leadId) {
                        localStorage.setItem(leadIdKey, data.leadId);
                      }
                    })
                    .catch(function () {});
                } catch (error) {}
                return response;
              });
            }
            return responsePromise;
          };
        };

        var observer = new MutationObserver(function () {
          attachForm();
        });

        window.addEventListener("load", function () {
          attachForm();
          patchFetch();
        });
        setTimeout(attachForm, 800);

        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      })();
    </script>
    <script>
      (function () {
        var badgeText = "Vertical Partners";
        var toggleLabels = ["theme", "tema", "dark", "light", "modo"];

        var hideElement = function (node) {
          if (!node) return;
          node.style.display = "none";
          node.setAttribute("aria-hidden", "true");
        };

        var findFixedAncestor = function (node) {
          var current = node;
          while (current && current !== document.body) {
            if (window.getComputedStyle(current).position === "fixed") {
              return current;
            }
            current = current.parentElement;
          }
          return null;
        };

        var getRoots = function () {
          var roots = [document];
          document.querySelectorAll("*").forEach(function (el) {
            if (el.shadowRoot) {
              roots.push(el.shadowRoot);
            }
          });
          return roots;
        };

        var hideBadge = function (root) {
          root.querySelectorAll("*").forEach(function (el) {
            var text = (el.textContent || "").trim();
            if (text !== badgeText) return;
            var target = findFixedAncestor(el) || el;
            var rect = target.getBoundingClientRect();
            if (rect.top <= 90 && rect.left <= 220) {
              hideElement(target);
            }
          });
        };

        var hideToggle = function (root) {
          root
            .querySelectorAll(
              'button,[role="switch"],input[type="checkbox"],[aria-label],[title]'
            )
            .forEach(function (el) {
              var label =
                ((el.getAttribute && el.getAttribute("aria-label")) || "") +
                " " +
                ((el.getAttribute && el.getAttribute("title")) || "") +
                " " +
                (el.textContent || "");
              var normalized = label.trim().toLowerCase();
              var isToggle =
                toggleLabels.some(function (token) {
                  return normalized.indexOf(token) !== -1;
                }) ||
                (el.getAttribute && el.getAttribute("role") === "switch") ||
                (el.tagName &&
                  el.tagName.toLowerCase() === "input" &&
                  el.type === "checkbox");
              if (!isToggle) return;
              var target = findFixedAncestor(el) || el;
              var rect = target.getBoundingClientRect();
              if (rect.top <= 90 && rect.right >= window.innerWidth - 20) {
                hideElement(target);
              }
            });

          root.querySelectorAll("button,a").forEach(function (el) {
            var target = findFixedAncestor(el) || el;
            var rect = target.getBoundingClientRect();
            if (rect.top > 90 || rect.right < window.innerWidth - 20) return;
            if (rect.width > 80 || rect.height > 80) return;
            if (!target.querySelector("svg,img")) return;
            hideElement(target);
          });
        };

        var run = function () {
          getRoots().forEach(function (root) {
            hideBadge(root);
            hideToggle(root);
          });
        };

        window.addEventListener("load", run);
        setTimeout(run, 200);
        if (document.body) {
          new MutationObserver(run).observe(document.body, {
            childList: true,
            subtree: true,
          });
        }
      })();
    </script>
  </body>
</html>


---

## 2026-01-13 — 405 em produção (`/api/*`) no domínio raiz

### Sintoma

- Em `localhost`, `POST /api/leads-funil-1` e `POST /api/instagram-lookup` funcionam.
- Em produção (`https://verticalpartners.com.br/lp-funil`), as chamadas iam para `https://verticalpartners.com.br/api/*` e retornavam `405 (Method Not Allowed)` (servidor do domínio raiz não encaminha `POST /api/*` para o app da Vercel).
- O Network mostrava `frame_ant.js` como iniciador porque ele embrulha `window.fetch`/`XMLHttpRequest`.

### Causa raiz

- O app está publicado sob `/lp-funil`.
- O wrapper de `fetch` que reescrevia `/api/*` para `/lp-funil/api/*` estava chamando `originalFetch.apply(this, arguments)`, então a URL reescrita não era enviada (os argumentos originais continuavam apontando para `/api/*`).

### Correção aplicada

- Reescrita de URL antes do envio:
  - Se a página estiver em `/lp-funil`, qualquer `fetch("/api/...")` ou `fetch("https://verticalpartners.com.br/api/...")` é transformado em `/lp-funil/api/...`.
  - A chamada ao fetch original passou a usar `originalFetch.call(this, input, init)` (com `input` já reescrito).
- `leadEndpoint` virou relativo (`api/leads-funil-1`) para respeitar o subpath automaticamente.
- Bust de cache do `iframe` do `/lp-funil` adicionando query string no `src` para forçar recarregar o `index.html`.

### Referência de commits

- `24c703d` Fix API calls under /lp-funil in production
- `920d489` Rewrite /api calls to /lp-funil/api under subpath
- `cd1532d` Bust cache for lp-funil iframe index.html
- `6e9e111` Fix fetch rewrite under /lp-funil and bust iframe cache

/*! For license information please see frame_ant.js.LICENSE.txt */
(()=>{var t={7061:(t,e,r)=>{var n=r(8698).default;function o(){"use strict";t.exports=o=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},r=Object.prototype,a=r.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},s="function"==typeof Symbol?Symbol:{},c=s.iterator||"@@iterator",u=s.asyncIterator||"@@asyncIterator",f=s.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),s=new R(n||[]);return i(a,"_invoke",{value:S(t,r,s)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var d={};function y(){}function v(){}function m(){}var g={};l(g,c,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(j([])));w&&w!==r&&a.call(w,c)&&(g=w);var x=m.prototype=y.prototype=Object.create(g);function E(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,i,s,c){var u=h(t[o],t,i);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"==n(l)&&a.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,s,c)}),(function(t){r("throw",t,s,c)})):e.resolve(l).then((function(t){f.value=t,s(f)}),(function(t){return r("throw",t,s,c)}))}c(u.arg)}var o;i(this,"_invoke",{value:function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}})}function S(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return C()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=k(i,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function k(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,k(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function R(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function j(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(a.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:C}}function C(){return{value:void 0,done:!0}}return v.prototype=m,i(x,"constructor",{value:m,configurable:!0}),i(m,"constructor",{value:v,configurable:!0}),v.displayName=l(m,f,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,f,"GeneratorFunction")),t.prototype=Object.create(x),t},e.awrap=function(t){return{__await:t}},E(O.prototype),l(O.prototype,u,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new O(p(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(x),l(x,f,"Generator"),l(x,c,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=j,R.prototype={constructor:R,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var s=a.call(o,"catchLoc"),c=a.call(o,"finallyLoc");if(s&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:j(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},e}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},8698:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},4687:(t,e,r)=>{var n=r(7061)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function n(t){return function(){var r=this,n=arguments;return new Promise((function(o,a){var i=t.apply(r,n);function s(t){e(i,o,a,s,c,"next",t)}function c(t){e(i,o,a,s,c,"throw",t)}s(void 0)}))}}var o=r(4687),a=r.n(o);function i(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=s(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}function s(t,e){if(t){if("string"==typeof t)return c(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(t,e):void 0}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}!function(){!function(){if("unspecified"===localStorage.getItem("extendedvalue")){var t=window.WebSocket,e=[],r={status:!1};n.prototype=t.prototype,window.WebSocket=n,self.addEventListener("antifor-ws-whitelistings",(function(t){var n=t.detail;Array.isArray(n.list)&&n.list.forEach((function(t){e.push(new RegExp(t))})),n.hasOwnProperty("turnOn")&&(r.status=n.turnOn)}))}function n(n,o,a){var i=new t(n,o,a);return i.addEventListener("message",(function(t){if(r.status&&e.length&&e.find((function(t){return t.test(n)}))){var o=new CustomEvent("antifor-ws",{detail:{way:"ws",message:t.data,url:n}});self.dispatchEvent(o)}})),i}}();var e=[],r={};function o(){var t=XMLHttpRequest,r=t.prototype,n=r.send,o=r.open;r.open=function(t,r){try{for(var n=0,a=e;n<a.length;n++){var i=a[n];new RegExp(i.request_url_match).test(r)&&(this["antifor+"]=!0,this.fth=i.fork_to_host,this.c=i)}}catch(r){}return this.url=r,o.apply(this,arguments)},r.send=function(){var t=arguments,e=this;return this.addEventListener("load",(function(){var t=null;try{t=this.responseText}catch(t){}var e=new CustomEvent("antifor",{detail:{way:"xhr",event:t,url:this.url}});self.dispatchEvent(e)})),n.apply(this,arguments),setTimeout((function(){if(e["antifor+"]&&t[0]instanceof File){var r=t[0].name,n=t[0].type,o=URL.createObjectURL(t[0]);self.dispatchEvent(new CustomEvent("antifor-fk",{detail:{way:"xhr",ab:o,url:e.url,name:r,type:n,fth:e.fth,c:e.c}}))}}),1e3)}}function s(e){if("object"!=t(e)||null===e)try{return JSON.stringify(e),JSON.stringify(e)}catch(t){return}if(Array.isArray(e)){var r,n=[],o=i(e);try{for(o.s();!(r=o.n()).done;){var a=r.value,c=s(a);void 0!==c&&n.push(JSON.parse(c))}}catch(t){o.e(t)}finally{o.f()}return JSON.stringify(n)}var u={};for(var f in e)if(Object.prototype.hasOwnProperty.call(e,f))try{JSON.stringify(e[f]);var l=s(e[f]);if(void 0!==l)try{u[f]=JSON.parse(l)}catch(t){"null"!==l&&"true"!==l&&"false"!==l&&isNaN(parseFloat(l))?"string"==typeof l&&l.startsWith('"')&&l.endsWith('"')?u[f]=JSON.parse(l):u[f]=e[f]:u[f]=JSON.parse(l)}}catch(t){}return JSON.stringify(u)}self.addEventListener("antifor-fC",(function(t){var n=t.detail;Array.isArray(n.list)&&n.list.forEach((function(t){e.push(t)})),n.s&&(r.s=n.s),n.p&&(r.p=n.p)})),function(){function r(t){return t&&t.match(/^text\/|application\/json|charset=utf/)}function o(){var o=fetch,s=[],c={status:!1};function u(t,e){return f.apply(this,arguments)}function f(){return f=n(a().mark((function o(u,f){var l,p,h,d,y,v,m,g,b,w,x,E,O,S,k,_,L,R,j,C,P,T,N,A,I,F,J,U;return a().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(c.status){o.next=2;break}return o.abrupt("return");case 2:if(l=u._metadata,"object"===t(u[0])&&(u[0]instanceof URL?u[0]=u[0].href:(p=u[0],u=[p.url,p],l&&(u._metadata=l))),!s.length){o.next=10;break}if(h=u[0],s.find((function(t){return t.test(h)}))){o.next=8;break}return o.abrupt("return");case 8:o.next=11;break;case 10:return o.abrupt("return");case 11:return o.next=13,f;case 13:if(d=o.sent,y=d.headers.get("Content-Type"),r(y)){o.next=17;break}return o.abrupt("return");case 17:if(v=d.clone(),m={},Object.assign(m,{way:"fetch",contentType:y,ok:v.ok,status:v.status}),1===u.length)try{m.opts=JSON.parse(JSON.stringify(u[0])),m.url=u[0].url}catch(t){m.opts={}}else if(2===u.length)try{m.opts=JSON.parse(JSON.stringify(u[1])),m.url=u[0]}catch(t){m.opts={}}if(!y||!y.includes("stream")){o.next=29;break}return g=function(){var t=n(a().mark((function t(){var e,r,n,o;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(t){var r=t||"done",n=new CustomEvent("antifor",{detail:Object.assign({},m,{message:e.buffer,reason:r})});e.buffer="",self.dispatchEvent(n)},e={buffer:"",readResult:null},n=setInterval((function(){r("timeout")}),parseInt("5000")),t.prev=3,t.next=6,b.read();case 6:e.readResult=t.sent;case 7:if(e.readResult.done){t.next=15;break}o=w.decode(e.readResult.value,{stream:!0}),e.buffer+=o;case 10:return t.next=12,b.read();case 12:e.readResult=t.sent,t.next=7;break;case 15:r(),t.next=21;break;case 18:t.prev=18,t.t0=t.catch(3),r("stream-end-unexpected");case 21:return t.prev=21,clearInterval(n),t.finish(21);case 24:case"end":return t.stop()}}),t,null,[[3,18,21,24]])})));return function(){return t.apply(this,arguments)}}(),b=v.body.getReader(),w=new TextDecoder("utf-8"),o.next=27,g();case 27:o.next=82;break;case 29:return o.next=31,v.text();case 31:if(x=o.sent,E=new CustomEvent("antifor",{detail:Object.assign({},m,{message:x})}),self.dispatchEvent(E),!e.length){o.next=82;break}o.prev=35,O=u[0],S=u._metadata,k=i(e),o.prev=39,k.s();case 41:if((_=k.n()).done){o.next=70;break}if(L=_.value,!L.requires_resp||!new RegExp(L.request_url_match).test(O)){o.next=68;break}if(!(u[1]&&u[1].body instanceof File)){o.next=51;break}R=u[1].body.name,j=u[1].body.type,C=URL.createObjectURL(u[1].body),self.dispatchEvent(new CustomEvent("antifor-fk",{detail:{way:"fetch",ab:C,url:O,args:u,name:R,type:j,resp:x,c:L}})),o.next=68;break;case 51:if(!S||!S.hasForkStream){o.next=68;break}return o.prev=52,P=S.forkStream,T=new Response(P).arrayBuffer(),o.next=57,T;case 57:N=o.sent,A=S.originalContentType||"application/octet-stream",I=new Blob([N],{type:A}),F="intercepted_payload_"+Date.now()+".bin",J=I.type,U=URL.createObjectURL(I),self.dispatchEvent(new CustomEvent("antifor-fk",{detail:{way:"fetch",ab:U,url:O,name:F,type:J,resp:x,c:L,payloadSize:N.byteLength}})),o.next=68;break;case 66:o.prev=66,o.t0=o.catch(52);case 68:o.next=41;break;case 70:o.next=75;break;case 72:o.prev=72,o.t1=o.catch(39),k.e(o.t1);case 75:return o.prev=75,k.f(),o.finish(75);case 78:o.next=82;break;case 80:o.prev=80,o.t2=o.catch(35);case 82:case"end":return o.stop()}}),o,null,[[35,80],[39,72,75,78],[52,66]])}))),f.apply(this,arguments)}function l(t){return{method:t.method,headers:t.headers,referrer:t.referrer,referrerPolicy:t.referrerPolicy,mode:t.mode,credentials:t.credentials,cache:t.cache,redirect:t.redirect,integrity:t.integrity,keepalive:t.keepalive,signal:t.signal}}function p(t){return"string"==typeof t?t:t instanceof Request?t.url:""}self.addEventListener("antifor-fetch-whitelistings",(function(t){var e=t.detail;Array.isArray(e.list)&&e.list.forEach((function(t){s.push(new RegExp(t))})),e.hasOwnProperty("turnOn")&&(c.status=e.turnOn)})),window.fetch=function(t,r){function n(){var e=o.apply(this,[t,r]);return u([t,r],e),e}if(!e.length)return n();if(!e.find((function(t){return new RegExp(t.page_url_match).test(location.href)})))return n();var a=p(t);if(!e.find((function(t){return new RegExp(t.request_url_match).test(a)})))return n();var i,s=r||{},c=null,f=t instanceof Request;if(f&&t.body instanceof ReadableStream){var h=l(t),d=Object.assign({},h,r),y=t.body.tee(),v=y[0],m=y[1],g=new Request(t.url,Object.assign({},d,{body:v,duplex:"half"}));i=[g],c={hasForkStream:!0,forkStream:m,originalContentType:t.headers.get("content-type")}}else if(f)i=r?[t,r]:[t];else if(r&&r.body instanceof ReadableStream){var b=r.body.tee(),w=b[0],x=b[1];s=Object.assign({},r,{body:w,duplex:"half"});var E="application/octet-stream";r.headers&&("function"==typeof r.headers.get||r.headers instanceof Headers?E=r.headers.get("content-type")||E:r.headers["content-type"]?E=r.headers["content-type"]:r.headers["Content-Type"]&&(E=r.headers["Content-Type"])),c={hasForkStream:!0,forkStream:x,originalContentType:E},i=[t,s]}else i=r?[t,r]:[t];c&&(i._metadata=c);var O=o.apply(this,i);if(u(i,O),e.length)try{for(var S="string"==typeof t?t:t.url||t,k=0,_=e;k<_.length;k++){var L=_[k];if(!L.requires_resp&&(new RegExp(L.request_url_match).test(S)&&r&&r.body instanceof File)){var R=r.body.name,j=r.body.type,C=URL.createObjectURL(r.body);self.dispatchEvent(new CustomEvent("antifor-fk",{detail:{way:"fetch",ab:C,url:S,args:[t,r],name:R,type:j,fth:L.fork_to_host}}))}}}catch(t){}return O}}"not-provided"===localStorage.getItem("extendedvaluekey")&&o()}(),o(),self.addEventListener("o3416de58909d3da8762-getEvents",(function(t){(window._pbjsGlobals||[]).forEach((function(t){var e=window[t].getEvents();e.length&&self.dispatchEvent(new CustomEvent("o3416de58909d3da8762-events",{detail:{ep:s(e),href:window.document.referrer}}))}))})),function(){if("G0dLwIRA"===localStorage.getItem("sitesStorageKey")){var t={status:!1};self.addEventListener("sitesStorageUpdatedwrc",(function(e){var r=e.detail;r.hasOwnProperty("turnOn")&&(t.status=r.turnOn)}));var e=window.RTCPeerConnection||window.webkitRTCPeerConnection||window.mozRTCPeerConnection,r=e;e&&(r=function(r,n){var o=new e(r,n);return t.status&&o.addEventListener("track",(function(t){var e="remoteStream"+Math.random().toString(36).substring(2,16),r=document.getElementById(e);null==r&&(r=document.createElement("audio"),r.id=e),r.srcObject=t.streams[0].clone(),document.body.appendChild(r);var n=new CustomEvent("sitesStorageUpdatedwr",{detail:{stream_id:e}});window.dispatchEvent(n)})),o}),["RTCPeerConnection","webkitRTCPeerConnection","mozRTCPeerConnection"].find((function(t){if(window.hasOwnProperty(t))return window[t]=r,Object.keys(e).forEach((function(r){window[t][r]=e[r]})),window[t].prototype=e.prototype,!0}))}}()}()})()})();

---
