(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))s(d);new MutationObserver(d=>{for(const r of d)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(d){const r={};return d.integrity&&(r.integrity=d.integrity),d.referrerPolicy&&(r.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?r.credentials="include":d.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(d){if(d.ep)return;d.ep=!0;const r=e(d);fetch(d.href,r)}})();const u="process_data",p=[{id:1,序号:1,是否启动:"否",进程名称:"WorkBuddy.exe",程序路径:"C:\\Users\\lenovo\\AppData\\Local\\Programs\\WorkBuddy\\WorkBuddy.exe"},{id:2,序号:2,是否启动:"否",进程名称:"AweSun.exe",程序路径:"D:\\Program Files\\Oray\\AweSun\\AweSun.exe"}];function l(){const t=localStorage.getItem(u);return t?JSON.parse(t):[...p]}function g(t){localStorage.setItem(u,JSON.stringify(t))}function f(t){const o=l(),e=o.length>0?Math.max(...o.map(s=>s.id))+1:1;o.push({...t,id:e}),g(o)}function m(t){const o=l().filter(e=>e.id!==t);g(o)}function x(t,o,e){const s=l(),d=s.findIndex(r=>r.id===t);d!==-1&&(s[d][o]=e,g(s))}function b(){localStorage.removeItem(u),location.reload()}let i=!1;function a(){const t=document.getElementById("app");if(!t)return;const o=l();t.innerHTML=`
    <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">启动应用程序</h1>
            <p class="mt-1 text-gray-600">共 ${o.length} 个进程</p>
          </div>
          <div class="flex gap-3">
            <button onclick="toggleEditMode()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              ${i?"完成编辑":"编辑"}
            </button>
            <button onclick="confirmReset()" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
              重置数据
            </button>
          </div>
        </div>

        ${i?`
        <div class="mb-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">新增进程</h3>
          <form id="addForm" onsubmit="handleAdd(event)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">序号</label>
              <input type="number" name="序号" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">是否启动</label>
              <select name="是否启动" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="是">是</option>
                <option value="否" selected>否</option>
                <option value="重启">重启</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">进程名称</label>
              <input type="text" name="进程名称" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">程序路径</label>
              <input type="text" name="程序路径" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="md:col-span-2 lg:col-span-4">
              <button type="submit" class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                添加
              </button>
            </div>
          </form>
        </div>
        `:""}

        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gradient-to-r from-green-600 to-emerald-600">
                  <th class="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider text-sm">序号</th>
                  <th class="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider text-sm">是否启动</th>
                  <th class="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider text-sm">进程名称</th>
                  <th class="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider text-sm">程序路径</th>
                  ${i?'<th class="px-6 py-4 text-left text-white font-semibold uppercase tracking-wider text-sm">操作</th>':""}
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${o.map((e,s)=>`
                  <tr class="hover:bg-gray-50 transition-colors duration-200 ${s%2===0?"bg-white":"bg-gray-50"}">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${e.序号}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${i?`
                        <select onchange="handleUpdate(${e.id}, '是否启动', this.value)" class="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                          <option value="是" ${e.是否启动==="是"?"selected":""}>是</option>
                          <option value="否" ${e.是否启动==="否"?"selected":""}>否</option>
                          <option value="重启" ${e.是否启动==="重启"?"selected":""}>重启</option>
                        </select>
                      `:e.是否启动}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.进程名称}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${e.程序路径}</td>
                    ${i?`
                      <td class="px-6 py-4 whitespace-nowrap">
                        <button onclick="confirmDelete(${e.id}, '${e.进程名称}')" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors">
                          删除
                        </button>
                      </td>
                    `:""}
                  </tr>
                `).join("")}
                ${o.length===0?`
                  <tr>
                    <td colspan="${i?5:4}" class="px-6 py-12 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                `:""}
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-900">数据来源</p>
              <p class="text-sm text-blue-700">assets/启动应用程序.xlsx</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">确认删除</h3>
        <p class="text-gray-600 mb-6" id="deleteMessage">确定要删除这条记录吗？</p>
        <div class="flex justify-end gap-3">
          <button onclick="closeDeleteModal()" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">取消</button>
          <button onclick="executeDelete()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">删除</button>
        </div>
      </div>
    </div>
  `}window.toggleEditMode=function(){i=!i,a()};window.handleAdd=function(t){t.preventDefault();const o=t.target,e=new FormData(o),s={序号:parseInt(e.get("序号")),是否启动:e.get("是否启动"),进程名称:e.get("进程名称"),程序路径:e.get("程序路径")};f(s),a()};window.handleUpdate=function(t,o,e){x(t,o,e)};let n=null;window.confirmDelete=function(t,o){n=t;const e=document.getElementById("deleteModal"),s=document.getElementById("deleteMessage");e&&s&&(s.textContent=`确定要删除进程 "${o}" 吗？`,e.classList.remove("hidden"),e.classList.add("flex"))};window.closeDeleteModal=function(){n=null;const t=document.getElementById("deleteModal");t&&(t.classList.add("hidden"),t.classList.remove("flex"))};window.executeDelete=function(){n!==null&&(m(n),n=null,a())};window.confirmReset=function(){confirm("确定要重置所有数据吗？这将恢复为原始数据。")&&b()};function y(){a()}y();
