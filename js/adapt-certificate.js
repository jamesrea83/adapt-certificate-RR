define([
    'core/js/adapt'
],function(Adapt) {

    var Certificate = Backbone.View.extend({

        events: {
            'click': 'launchCertificate'
        },

        initialize: function() {
            this.listenTo(Adapt, {
                'adapt:start': this.setupEventListeners,
                'adapt:initialize': this.checkIfReturning
            })
        },

        checkIfReturning: function() {
            if (Adapt.offlineStorage.get('cert-enabled')) this.render();
        },

        setupEventListeners() {
            this.listenTo(Adapt.course, 'change:_isComplete', this.onIsCompleteChange)
        },

        onIsCompleteChange: function(model, isComplete) {
            Adapt.offlineStorage.set('cert-enabled', true);
            Adapt.offlineStorage.set('cert-date', new Date().toLocaleDateString("en-GB"));
            this.render();
        },

        render: function() {
            var template = Handlebars.templates.certificateLaunchButton;
            var data = {
                buttonText: Adapt.config.get('_certificate').launchButtonText
            }
            this.setElement(template(data)).$el.prependTo($(".navigation-inner"));
        },

        launchCertificate: function() {

            var certificateData = Adapt.config.get('_certificate');
            certificateData.language = Adapt.config.get('_activeLanguage');
            certificateData.textDirection = Adapt.config.get('_defaultDirection');

            this.compileCertificateData(certificateData);

            var domain = document.location.origin;
            var popup = window.open("assets/certificate.html", "certificate");

            window.addEventListener('message', function() {
                popup.postMessage(certificateData, domain);
            });
        },

        compileCertificateData: function(certificateData) {

            if(certificateData._hasBeenCompiled === true) return;

            var completionDate = Adapt.offlineStorage.get('cert-date') || (new Date()).toLocaleDateString("en-GB");
            var learnerInfo = this.getLearnerName()

            var data = {
                date: completionDate,
                learnerInfo: learnerInfo,
                courseTitle: Adapt.course.get('title')
            };

            certificateData.labels.forEach(function(label, index) {
                if(label.indexOf("{{") !== -1) {
                    certificateData.labels[index] = Handlebars.compile(label)(data);
                }
            });
            certificateData._hasBeenCompiled = true;
        },

        getLearnerName: function() {
            var learnerInfo = Adapt.offlineStorage.get('learnerinfo');
            return learnerInfo.firstname + " " + learnerInfo.lastname;
        }
    })

    return new Certificate();
 });
