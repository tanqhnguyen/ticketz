# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'SoldTicket.user_id'
        db.delete_column(u'core_soldticket', 'user_id_id')

        # Deleting field 'SoldTicket.event_id'
        db.delete_column(u'core_soldticket', 'event_id_id')

        # Deleting field 'SoldTicket.ticket_type_id'
        db.delete_column(u'core_soldticket', 'ticket_type_id_id')

        # Adding field 'SoldTicket.event'
        db.add_column(u'core_soldticket', 'event',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=None, to=orm['core.Event']),
                      keep_default=False)

        # Adding field 'SoldTicket.ticket_type'
        db.add_column(u'core_soldticket', 'ticket_type',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=None, to=orm['core.TicketType']),
                      keep_default=False)

        # Adding field 'SoldTicket.user'
        db.add_column(u'core_soldticket', 'user',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=None, to=orm['core.User']),
                      keep_default=False)

        # Deleting field 'Event.user_id'
        db.delete_column(u'core_event', 'user_id_id')

        # Adding field 'Event.user'
        db.add_column(u'core_event', 'user',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=None, to=orm['core.User']),
                      keep_default=False)

        # Deleting field 'TicketType.event_id'
        db.delete_column(u'core_tickettype', 'event_id_id')

        # Adding field 'TicketType.event'
        db.add_column(u'core_tickettype', 'event',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=None, to=orm['core.Event']),
                      keep_default=False)


    def backwards(self, orm):

        # User chose to not deal with backwards NULL issues for 'SoldTicket.user_id'
        raise RuntimeError("Cannot reverse this migration. 'SoldTicket.user_id' and its values cannot be restored.")
        
        # The following code is provided here to aid in writing a correct migration        # Adding field 'SoldTicket.user_id'
        db.add_column(u'core_soldticket', 'user_id',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.User']),
                      keep_default=False)


        # User chose to not deal with backwards NULL issues for 'SoldTicket.event_id'
        raise RuntimeError("Cannot reverse this migration. 'SoldTicket.event_id' and its values cannot be restored.")
        
        # The following code is provided here to aid in writing a correct migration        # Adding field 'SoldTicket.event_id'
        db.add_column(u'core_soldticket', 'event_id',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Event']),
                      keep_default=False)


        # User chose to not deal with backwards NULL issues for 'SoldTicket.ticket_type_id'
        raise RuntimeError("Cannot reverse this migration. 'SoldTicket.ticket_type_id' and its values cannot be restored.")
        
        # The following code is provided here to aid in writing a correct migration        # Adding field 'SoldTicket.ticket_type_id'
        db.add_column(u'core_soldticket', 'ticket_type_id',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.TicketType']),
                      keep_default=False)

        # Deleting field 'SoldTicket.event'
        db.delete_column(u'core_soldticket', 'event_id')

        # Deleting field 'SoldTicket.ticket_type'
        db.delete_column(u'core_soldticket', 'ticket_type_id')

        # Deleting field 'SoldTicket.user'
        db.delete_column(u'core_soldticket', 'user_id')


        # User chose to not deal with backwards NULL issues for 'Event.user_id'
        raise RuntimeError("Cannot reverse this migration. 'Event.user_id' and its values cannot be restored.")
        
        # The following code is provided here to aid in writing a correct migration        # Adding field 'Event.user_id'
        db.add_column(u'core_event', 'user_id',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.User']),
                      keep_default=False)

        # Deleting field 'Event.user'
        db.delete_column(u'core_event', 'user_id')


        # User chose to not deal with backwards NULL issues for 'TicketType.event_id'
        raise RuntimeError("Cannot reverse this migration. 'TicketType.event_id' and its values cannot be restored.")
        
        # The following code is provided here to aid in writing a correct migration        # Adding field 'TicketType.event_id'
        db.add_column(u'core_tickettype', 'event_id',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Event']),
                      keep_default=False)

        # Deleting field 'TicketType.event'
        db.delete_column(u'core_tickettype', 'event_id')


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
            'age_limit': ('django.db.models.fields.IntegerField', [], {}),
            'description': ('django.db.models.fields.TextField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'live_date': ('django.db.models.fields.DateTimeField', [], {}),
            'name': ('django.db.models.fields.TextField', [], {'max_length': '128'}),
            'page_attribute': ('django.db.models.fields.TextField', [], {}),
            'start_date': ('django.db.models.fields.DateTimeField', [], {}),
            'type': ('django.db.models.fields.TextField', [], {'max_length': '16'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.User']"})
        },
        'core.soldticket': {
            'Meta': {'object_name': 'SoldTicket'},
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Event']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'seat': ('django.db.models.fields.CharField', [], {'max_length': '45'}),
            'ticket_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.TicketType']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.User']"})
        },
        'core.tickettype': {
            'Meta': {'object_name': 'TicketType'},
            'amount': ('django.db.models.fields.IntegerField', [], {}),
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Event']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '45'}),
            'price': ('django.db.models.fields.DecimalField', [], {'max_length': '2', 'max_digits': '2', 'decimal_places': '2'}),
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