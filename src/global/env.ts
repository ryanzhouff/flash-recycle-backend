export type PrimitiveType = boolean | number | string | undefined | null;

/**
 *
 * @param key 环境变量的健值
 * @param defaultValue 未设置环境变量的值则使用默认值
 * @param callback 格式化函数
 * @returns
 */
function formatValue<T extends PrimitiveType = string>(
  key: string,
  defaultValue: T,
  callback?: (value: string) => T,
): T {
  const value: string | undefined = process.env[key];

  if (typeof value === 'undefined') return defaultValue;

  if (!callback) return value as unknown as T;

  return callback(value);
}

export function env(key: string, defaultValue: string = '') {
  return formatValue(key, defaultValue);
}

export function envString(key: string, defaultValue: string = '') {
  return formatValue(key, defaultValue);
}

export function envNumber(key: string, defaultValue: number = 0) {
  return formatValue(key, defaultValue, value => {
    try {
      return Number(value);
    } catch {
      throw new Error(`${key} must be a number`);
    }
  });
}

export function envBoolean(key: string, defaultValue: boolean = false) {
  return formatValue(key, defaultValue, value => {
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} must be a number`);
    }
  });
}
