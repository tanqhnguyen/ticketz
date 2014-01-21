# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Event.zipcode'
        db.add_column(u'core_event', 'zipcode',
                      self.gf('django.db.models.fields.TextField')(default='', max_length=5, blank=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Event.zipcode'
        db.delete_column(u'core_event', 'zipcode')


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'core.event': {
            'Meta': {'object_name': 'Event'},
            'address1': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'address2': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'address_name': ('django.db.models.fields.TextField', [], {'max_length': '128', 'blank': 'True'}),
            'city': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'created_date': ('django.db.models.fields.BigIntegerField', [], {'default': '1390323114958'}),
            'description': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'end_date': ('django.db.models.fields.BigIntegerField', [], {'default': '1390323114958'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'json': ('jsonfield.fields.JSONField', [], {}),
            'organizer_contact': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'organizer_name': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'start_date': ('django.db.models.fields.BigIntegerField', [], {'default': '1390323114958'}),
            'title': ('django.db.models.fields.TextField', [], {'default': "'New Event'", 'max_length': '128'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.User']"}),
            'zipcode': ('django.db.models.fields.TextField', [], {'max_length': '5', 'blank': 'True'})
        },
        'core.soldticket': {
            'Meta': {'object_name': 'SoldTicket'},
            'code': ('django.db.models.fields.TextField', [], {'unique': 'True', 'max_length': '36'}),
            'created_date': ('django.db.models.fields.BigIntegerField', [], {'default': '1390323115091'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_used': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'ticket_type': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'tickets'", 'to': "orm['core.TicketType']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'tickets'", 'to': "orm['core.User']"})
        },
        'core.tickettype': {
            'Meta': {'object_name': 'TicketType'},
            'amount': ('django.db.models.fields.IntegerField', [], {}),
            'event': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'ticket_types'", 'to': "orm['core.Event']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '45'}),
            'price': ('django.db.models.fields.DecimalField', [], {'max_digits': '5', 'decimal_places': '2'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '45'})
        },
        'core.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_external': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        }
    }

    complete_apps = ['core']