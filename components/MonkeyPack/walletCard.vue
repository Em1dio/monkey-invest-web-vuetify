<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : 0"
        outlined
        @click="$emit('click', item._id)"
      >
        <v-card-title primary-title>
          {{ item.name }}
          <v-spacer></v-spacer>
          <p :class="currently >= 0 ? 'positive' : 'negative'">
            {{ totalPercent | toPercent }}
          </p>
        </v-card-title>
        <v-list two-line>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="green">mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.ownerUsername }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('Owner') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="red"> mdi-lock </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $t(item.isPublic ? 'Public' : 'Private')
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('Acl') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <strong>{{ $t('Total') }}</strong>
          <v-spacer></v-spacer>
          <strong :class="currently >= 0 ? 'positive' : 'negative'">
            {{ item.totalActual | toCurrency }}
          </strong>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    currently() {
      return this.item.totalActual - this.item.totalBefore
    },
    totalPercent() {
      return this.$util.calcPercent(
        this.item.totalBefore,
        this.item.totalActual
      )
    },
  },
}
</script>
<style scoped>
.positive {
  color: #36f1cd;
}

.negative {
  color: #cf4747;
}
</style>
