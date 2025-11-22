---
layout: default
title: "Contact"
permalink: "/contact.html"
---

<div class="container pt-5 pb-5">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
            <div class="card shadow-sm border-0">
                <div class="card-body p-5">
                    <h1 class="mb-4 text-center">{{ page.title }}</h1>
                    <p class="text-center text-muted mb-5">
                        Please send your message to <strong>{{ site.name }}</strong>. We'll reply as soon as possible!
                    </p>

                    <form action="https://formspree.io/{{ site.email }}" method="POST">
                        <div class="form-row mb-3">
                            <div class="col-md-6 mb-3 mb-md-0">
                                <input type="text" name="name" class="form-control form-control-lg" placeholder="Name*" required>
                            </div>
                            <div class="col-md-6">
                                <input type="email" name="_replyto" class="form-control form-control-lg" placeholder="E-mail Address*" required>
                            </div>
                        </div>

                        <div class="form-group mb-4">
                            <textarea name="message" rows="6" class="form-control form-control-lg" placeholder="Message*" required></textarea>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-success btn-lg px-5">
                                Send Message
                            </button>
                        </div>
                    </form>

                    <hr class="my-5">

                    <div class="text-center text-muted">
                        Or contact me directly via email: 
                        <a href="mailto:{{ site.email }}">{{ site.email }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
