export class DateHelper {

    /**
   * Quebra a data em dia, mês e ano.
   * 
   * @param date: string - data no formato iso.
   */
    static breakDate(date) {
        const aux = (date.split('T')[0]).split('-');
            return {ano: parseInt(aux[0]), mes: parseInt(aux[1]), dia: parseInt(aux[2])};
    }
}